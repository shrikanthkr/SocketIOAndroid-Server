module.exports = (function(){
	function auth (socket,params) {
			console.log('authenticating');
			User.findOne({ user_name: params.user_name })
			.populate('rooms') 
			.exec(function (err, user) {
				if (err) return socket.emit('auth',err)
				else if(user.user_name && Bcrypt.compareSync(params.password, user.password)){
					join_rooms(socket,user.rooms);
					socket.emit('auth',user);
				}else{
						socket.emit('auth',err);
				}

			});
	}
	function token_auth (socket,params) {
		try{
			User.find_by_token(params,function(data){
				socket.client.user = data;
				UsersRooms.getRooms([socket.client.user._id],function(err,user_rooms_ids){
					Room.findAll(user_rooms_ids,function(err,rooms){
						join_rooms(socket,rooms);
					});
				});
				socket.emit('users:token_auth',data);
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