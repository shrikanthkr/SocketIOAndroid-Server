module.exports = (function(){
	function new_message (socket,params) {
		console.log('Message: '+ params.to);
		params.sender = socket.client.user.user_name;
		Message.create(params,function(err,item){
			if(err){
				socket.emit('messages:new',err);

			}else{
				socket.emit('messages:new',item);
				Io.to(params.to).emit('messages:new',item);
			}
		});
	}
	function index(socket,params) {
		console.log('Message: '+ params.room_name);
		params.user_name =  socket.client.user.user_name;
		Message.find(params,function(err,item){
			if (err) {
				console.log(err);
				socket.emit('messages:index',err);
			} else{
				console.log(item);
				socket.emit('messages:index',item);
			};
			
		});
	}
	return{
		new_message: new_message,
		index: index
	}
})();