var socket_handler =(function(){
	return{
		push: function(socket,data){
			socket.join(data.room_name);
			console.log('Joined room '+socket.rooms);
		},
		delete: function(socket,data){
			console.log('Removed '+socket.id);
		}

	}
})();
module.exports  = socket_handler;