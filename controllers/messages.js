module.exports = (function(){
	function message (socket,params) {
		io.to(params.room_name).emit('updateChat',params);
		console.log('Message: '+ params.room_name);
	}
	return{
		message: message
	}
})();