module.exports = (function(){
	return [
		{
			url: 'auth',
			action: 'auth',
			controller: 'users'
		},
		{
			url: 'rooms:add',
			action: 'add',
			controller: 'rooms'
		},
		{
			url: 'rooms:new',
			action: 'new_room',
			controller: 'rooms'
		},
		{
			url: 'rooms:leave',
			action: 'addToRoom',
			controller: 'users'
		},
		{
			url: 'room:create',
			action: 'create',
			controller: 'rooms'
		},
		{
			url: 'message',
			action: 'message',
			controller: 'messages'
		},
		{
			url: 'user:create',
			action: 'create',
			controller: 'users'
		}
	]
})();