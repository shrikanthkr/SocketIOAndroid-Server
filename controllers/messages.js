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
		Message.find(params,function(err,item){
			console.log(item);
		});
	}
	return{
		new_message: new_message,
		index: index
	}
})();