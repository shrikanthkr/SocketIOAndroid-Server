module.exports = (function(){
	function auth (socket,params) {
		try{
			models.users.autheticate(params,function(data){
				if(!data.error){
					join_room(socket,data.user_name);
				}
				socket.emit('auth',data);
			});
		}catch(e){
			console.log(e.message);
		}
	}
	function join_room (socket,params) {
		socket.join(params.room_name);
		console.log('Joined room '+socket.rooms);
	}
	function create_user (socket,params) {
		models.users.create(params,function (err,result) {
			socket.emit('create_user',result);
		});
	}
	return{
		join_room: join_room,
		auth: auth,
		create_user: create_user
	}
})();