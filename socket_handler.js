var socket_handler =(function(){
	var sockets = {};
	return{
		push: function(socket){
			sockets[socket.id] = socket;
			console.log('Added '+socket.id);
		},
		delete: function(socket){
			delete sockets[socket.id];
			console.log('Removed '+socket.id);
		}
	}
})();
module.exports  = socket_handler;