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
			url: 'messages:new',
			action: 'new_message',
			controller: 'messages'
		},
		{
			url: 'messages:index',
			action: 'index',
			controller: 'messages'
		},
		{
			url: 'user:create',
			action: 'create',
			controller: 'users'
		},
		{
			url: 'rooms:contacts',
			action: 'contacts',
			controller: 'rooms'
		},
		{
			url: 'users:token_auth',
			action: 'token_auth',
			controller: 'users'
		}
	]
})();