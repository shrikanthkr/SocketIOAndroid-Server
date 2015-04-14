DB.createCollection('rooms', {w:1}, function(err, collection) {
	if(!err){
		console.log('rooms');
	}else{
		console.log(err);
	}
});
Room = (function(){
	var collection = DB.collection('rooms');

	function create(params,callback){
		console.log(params);
		collection.insert(params,{w:1},function(err,room){
			UsersRooms.create({user_id: params.user_id, room_id: room.ops[0]._id},function(err,item){
				callback(err,room);
			});
		});
	}

	function add (params,callback) {
		findOne(params.room_id,function(err,room){
			if(err){
				console.log(err);
			}
				else{
					console.log(room);
					UsersRooms.add({user_id: params.user_id, room_id: params.room_id},function(err,item){
						callback(err,room);
					});
				}

			});
		
	}
	function findOne(room_id,callback){
		console.log('finding Room'+room_id);
		var o_id = new ObjectID(room_id);
		collection.findOne({_id: o_id},callback );
	}
	function findAll(rooms,callback){
		collection.find({
			_id: {$in :rooms}
		} ).toArray(function(err,item){
			callback(err,item);
		});
	}
	return{
		create: create,
		add: add,
		findOne: findOne,
		findAll: findAll
	}
	
})();