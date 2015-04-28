DB.createCollection('messages', {w:1}, function(err, collection) {
	if(!err){
		console.log('messages');
	}else{
		console.log(err);
	}
});
Message = (function(){
	var collection = DB.collection('messages');
	function create(params,callback){
		console.log(params);
		
		collection.insert(params,{w:1},function(err,message){
			callback(err,message.ops[0]);
		});
	}

	function find(params,callback){
		console.log('finding message by room name:'+params.room_name);
		collection.find(
		{
			$or :[{
				to: params.room_name, sender: params.user_name,
			},
			{
				to: params.user_name, sender: params.room_name
				
			}]	
		}

		).toArray(callback);
	}
	return{
		find: find,
		create: create
	}
})();