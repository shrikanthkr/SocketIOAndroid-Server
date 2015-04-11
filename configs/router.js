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
		}
	]
})();