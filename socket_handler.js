var socket_handler =(function(){
	return{
		push: function(socket,data){
			
		},
		delete: function(socket,data){
			console.log('Removed '+socket.id);
		}

	}
})();
module.exports  = socket_handler;