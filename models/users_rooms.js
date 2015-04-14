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
		var users_rooms = [];
		console.log('getting rooms');
		collection.find({user_id: user_id}).toArray(function(err,results){
			results.forEach(function(value){
				users_rooms.push(value.room_id);
			});
			Room.findAll(users_rooms,callback);
		});
	}
	function users(room_id,callback){
		var users = [];
		console.log('getting rooms');
		collection.find({room_id: room_id}).toArray(function(err,results){
			results.forEach(function(value){
				users.push(value);
			});
			callback(err,users);
		});
	}
	function add (params,callback) {
		collection.findAndModify(
			{query: { user_id: params.user_id, room_id: params.room_id } },
			{new: true},callback);
	}
	return{
		create: create,
		getRooms: rooms,
		getUsers: users,
		add: add
	}
})();