module.exports = (function(){
	return [
		{
			url: 'auth',
			action: 'auth',
			controller: 'users'
		},
		{
			url: 'join_room',
			action: 'join_room',
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