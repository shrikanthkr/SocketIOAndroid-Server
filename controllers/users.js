module.exports = (function(){
	function auth (socket,params) {
		try{
			models.users.insert(params,function(data){
				console.log(data);
			});
		}catch(e){
			console.log(e.message);
		}
	}
	function join_room (socket,params) {
		// body...
	}
	return{
		join_room: join_room,
		auth: auth
	}
})();