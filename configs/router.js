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
			url: 'message',
			action: 'message',
			controller: 'messages'
		},
		{
			url: 'create_user',
			action: 'create_user',
			controller: 'users'
		}
	]
})();