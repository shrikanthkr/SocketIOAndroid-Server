DB.createCollection('users', {w:1}, function(err, collection) {
	if(!err){
		console.log('users');
	}else{
		console.log(err);
	}
});
User = (function(){
	var collection = DB.collection('users');
	var validations = {
		user_name: {
			pattern: /^\w{1,}$/i,
			message: 'Please enter a valid User Name'
		},
		phone_number: {
			pattern: /^\d{10}$/,
			message: 'Invalid Phone number'
		}
	}
	function validate(params){
		for (var key in validations) {
			var value = params[key], 
			test = validations[key],
			regex =  new RegExp(test.pattern) ;
			if (!regex.test(value)) {
				throw {error: test.message}
			}
		}
		return true;
	}
	function autheticate(data,callback){
			findOne(data.user_name,function(err,item){
				if(item && item.user_name && Bcrypt.compareSync(data.password, item.password) ){
					callback(item);
				}else{
					callback({error: 'Wrong username or password'});
				}

			});
		}
	function create(data,callback){
		try{
			validate(data);
			findOne(data.user_name,function(err,item){
				if(item && item.user_name){
					console.log('Already Exists '+data.user_name);
					callback({},{error: 'User already exists'});
				}else{
					console.log('creating '+data);
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
							}
							callback(err,user);
						});
					});
				}

			});
		}catch(e){
				console.log('Caught exceptions on validation'+e);
			callback({},e);
		}

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
		console.log('finding rooms: ');
		console.log(user_id);
		UsersRooms.getRooms(user_ids,callback);
	}

	function find_by_phone_numbers(phone_numbers,callback){
		collection.find({
			phone_number: {$in :phone_numbers}
		},{ user_name :1} ).toArray(callback);
	}
	return{
		find: find,
		autheticate: autheticate,
		create: create,
		find_by_phone_numbers: find_by_phone_numbers
	}
})();
