module.exports = (function(){
	function addToRoom (socket,params) {
	
		Room.add(params,function(err,room){
			if(err){
				console.log(err);
			}
			else{
				socket.join(params.room_id);
				console.log('Joined room '+params.room_id);
				socket.emit('rooms:add',room);
			}
		});
		
	}
	return{
		addToRoom: addToRoom
	}
})();