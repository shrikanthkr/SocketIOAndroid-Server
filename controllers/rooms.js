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
		var room = new Room({
			name: params.room_name,
			owner: socket.client.user  
		});
		room.members.push(socket.client.user);
		room.save(function (err) {
			if (err) socket.emit('rooms:new',err);
			else{
				socket.emit('rooms:new',room);
			}
		});

	}

	function contacts(socket,params){
		console.log('getting contacts rooms');
		var room_names = [];
		params.push(socket.client.user.phone_number);
		User.where('phone_number').in(params)
		.exec(function(err,users) {
			room_names = _.pluck(users,'user_name');
			Room.where('name').in(room_names).populate('members')
			.exec(function(err,rooms) {
				socket.emit('rooms:contacts',rooms);
			});
		})

	}
	return{
		add: add,
		new_room: new_room,
		contacts: contacts
	}
})();