module.exports = (function(){
	function auth (socket,params) {
		try{
			User.autheticate(params,function(data){
				socket.client.user = data;
				UsersRooms.getRooms([socket.client.user._id],function(err,user_rooms_ids){
					Room.findAll(user_rooms_ids,function(err,rooms){
						join_rooms(socket,rooms);
					});
				});
				socket.emit('auth',data);
			});
		}catch(e){
			socket.emit('auth',e);
		}
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
		User.create(params,function (err,result) {
			socket.client.user = result;
			socket.emit('user:create',result);
		});
	}
	return{
		auth: auth,
		create: create,
		token_auth: token_auth
	}
})();