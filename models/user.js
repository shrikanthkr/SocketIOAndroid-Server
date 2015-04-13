DB.createCollection('users', {w:1}, function(err, collection) {
			if(!err){
				console.log('users');
			}else{
				console.log(err);
			}
});
User = (function(){
	var collection = DB.collection('users');
	
	function autheticate(data,callback){

		findOne(data.user_name,function(err,item){
			if(item && item.user_name && Bcrypt.compareSync(data.password, item.password) ){
				rooms(item._id,function(err,rooms){
					item.rooms = rooms;
					callback(item);
				});
				
			}else{
				callback({error: 'Wrong username or password'});
			}
			
		});
		
	}
	function create(data,callback){
		findOne(data.user_name,function(err,item){
			if(item && item.user_name){
				console.log('Already Exists '+data.user_name);
				callback({},item);
			}else{
				console.log('creating '+data.user_name);
				data.password = Bcrypt.hashSync(data.password, Bcrypt.genSaltSync(10));
				collection.insert(data,{w:1}, function(err,user){
					user = user.ops[0];
					Room.create({name: user.user_name, user_id:user._id },function(err,room){
						room = room.ops[0];
							if(err) {
								console.log(err)
							}
							else{
								user.rooms = [];
								user.rooms.push(room);
								callback(err,user);
							}

					});
				});
			}
			
		});
		
	}
	function findOne(user_name,callback){
		console.log('finding '+user_name);
		collection.findOne({user_name: user_name},callback );
	}
	function find(user_name,callback){
		console.log('finding '+user_name);
		collection.find({user_name: user_name},callback );
	}
	function rooms(user_id,callback){
		console.log('finding rooms'+user_id);
		UsersRooms.getRooms(user_id,callback);
	}
	return{
		find: find,
		autheticate: autheticate,
		create: create
	}
})();
