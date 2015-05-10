module.exports = (function(){
	function new_message (socket,params) {
		console.log('Message: '+ params.to);
		Room.findOne({name:params.to}).exec(function (err,room) {
			if (err) socket.emit('messages:new',err);
			else{
				
				params.from = socket.client.user.user_name;
				params.room =room._id;
				var message = new Message(params);
				message.save(function (err) {
					if (err) socket.emit('messages:new',err);
					else{
						message.populate('room', '-members -messages' ,function(err,room){
							if (err) socket.emit('messages:new',err);
							else{
								socket.emit('messages:new',message);
								Io.to(params.to).emit('messages:new',message);
							}
						});
					}
				});
			}
		});
	}
	function index(socket,params) {
		console.log('Message: '+ params.room_name);
		params.user_name =  socket.client.user.user_name;
		Room.findOne({name: params.room_name})
		.populate('messages','-room')
		.select('messages')
		.exec(function (err,rooms) {
			if (err) socket.emit('messages:index',err);
			else{
				socket.emit('messages:index',rooms.messages);
			}
		});
	}
	return{
		new_message: new_message,
		index: index
	}
})();