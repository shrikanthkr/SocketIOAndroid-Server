module.exports = (function(){
	function auth (socket,params) {
		try{
			User.autheticate(params,function(data){
				if(!data.error){
					join_room(socket,data.user_name);
				}
				socket.emit('auth',data);
			});
		}catch(e){
			socket.emit('auth',e);
		}
	}
	function join_room (socket,room_name) {
		socket.join(room_name);
		console.log('Joined room '+room_name);
	}
	function create (socket,params) {
		User.create(params,function (err,result) {
			socket.emit('user:create',result);
		});
	}
	return{
		join_room: join_room,
		auth: auth,
		create: create
	}
})();