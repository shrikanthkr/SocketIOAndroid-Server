module.exports = (function(){
	function add (socket,params) {

		Room.add(params,function(err,room){
			if(err){
				console.log(err);
			}
			else{
				socket.join(params.room_id);
				console.log('Joined room '+params.room_id);
				socket.emit('rooms:add',room);
			}
		});
		
	}
	function new_room(socket,params) {

		Room.findOneByName(params.room_name,function(err,item){
			if(item){
				socket.emit('rooms:new',{error: "Already Exists"});
			}else{
				Room.create({name: params.room_name, user_id:socket.client.user._id },function(err,room){
					if(err){

					}else{
						socket.emit('rooms:new',room.ops[0]);
					}
				});
			}
		});
		
	}

	function contacts(socket,params){
		console.log('getting contacts rooms');
		var final_room_ids = [];
		User.find_by_phone_numbers(params.phone_numbers,function(err,users){
			users.push(socket.client.user._id);
			UsersRooms.getRooms(_.pluck(users,'_id'),function(err,user_rooms_ids){
				console.log(user_rooms_ids);
				Room.findAll(user_rooms_ids,function(err,rooms){
					socket.emit('rooms:contacts',rooms);
				});
			});
		});
	}
	return{
		add: add,
		new_room: new_room,
		contacts: contacts
	}
})();