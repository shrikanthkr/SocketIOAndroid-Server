DB.createCollection('users_rooms', {w:1}, function(err, collection) {
			if(!err){
				console.log('messages');
			}else{
				console.log(err);
			}
		});
UsersRooms = (function(){
	var collection = DB.collection('users_rooms');
	function create(params,callback){
		console.log(params);
		collection.insert(params,{w:1},callback);
	}

	function rooms(user_id,callback){
		var rooms = [];
		console.log('getting rooms');
		collection.find({user_id: user_id}).toArray(function(err,results){
			results.forEach(function(value){
				rooms.push(value);
			});
			callback(err,rooms);
		});
	}
	function users(room_id,callback){
		var users = [];
		console.log('getting rooms');
		collection.find({room_id_id: room_id}).toArray(function(err,results){
			results.forEach(function(value){
				users.push(value);
			});
			callback(err,users);
		});
	}
	return{
		create: create,
		getRooms: rooms,
		getUsers: users
	}
})();