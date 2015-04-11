var Redis = require('redis'),
jsonify = require('redis-jsonify');
jsonify.blacklist.push('lpush');
var redis  = (function(){
	var redis_instance = null,users,rooms;
	function init() {
		return jsonify(Redis.createClient());
	}
	function saveMessage(data){

	}
	function addToRoom(data){

	}
	function authUser(data,callback){
		console.log('Redis Auth user!!');
		redis_instance.lpush("users", {shri: { name:'shrikanth',password:'admin'}}, function(reply){console.log(reply)});
		
	}
	function getInstance(){
			if(!redis_instance){
				redis_instance = init();
			}
			console.log('Redis Initiated');
			return redis_instance;
		}
	return{
		getInstance: getInstance,
		authUser: authUser,
		saveMessage: saveMessage,
		addToRoom: addToRoom
	}
})();
module.exports  = redis;