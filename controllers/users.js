module.exports = (function(){
	function auth (socket,params) {
		console.log('authenticating');
		User.findOne(
			{ user_name: params.user_name },
			{},{})
		.populate('rooms','-members -messages') 
		.exec(function (err, user) {
			user.token = Randtoken.generate(16);
			user.save(function(err, user){
				if (err) return socket.emit('auth',err)
					else if(user &&  user.user_name && Bcrypt.compareSync(params.password, user.password)){
						socket.client.user = user;
						join_rooms(socket,user.rooms);
						socket.emit('auth',user);
					}else{
						socket.emit('auth',err);
					}
				});
		});
	}
	function token_auth (socket,params) {
		try{
			User.findOne(
				{ token: params.token })
				.populate('rooms','-members -messages') 
				.select('-password')
				.exec(function (err, user) {
					if(!user){
						socket.emit('users:token_auth',{error: 'Invalid Auth'}});
					}
					user.token = Randtoken.generate(16);
					user.save(function (err, user) {
						if (err) {
							return socket.emit('users:token_auth',err);
						}else if(user && user.user_name){
							socket.client.user = user;
							join_rooms(socket,user.rooms);
							socket.emit('users:token_auth',user);
						}else{
							socket.emit('users:token_auth',err);
						}
					});

				});
			}catch(e){
				socket.emit('users:token_auth',e);
			}
		}
		function join_rooms (socket,data) {
			data.forEach(function(value){
				socket.join(value.name);
				console.log('Joining Room: '+value.name);
			});

		}
		function create (socket,params) {
			params.password = Bcrypt.hashSync(params.password, Bcrypt.genSaltSync(Date.now()%31));
			var user  = new User(params);
			user.save(function (err) {
				if(err) socket.emit('user:create',err);
				else{
					var room = new Room({
						name: user.user_name,
						owner: user  
					});
					room.members.push(user);
					room.save(function (err) {
						if (err) socket.emit('user:create',err);
						else{
							socket.client.user = user;
							socket.emit('user:create',user);
						}
					});

				}

			});
		}
		return{
			auth: auth,
			create: create,
			token_auth: token_auth
		}
	})();