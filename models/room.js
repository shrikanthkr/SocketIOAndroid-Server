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
	return{
		create: create,
	}
	
})();