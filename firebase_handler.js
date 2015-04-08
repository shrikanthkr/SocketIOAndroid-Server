var Firebase = require('firebase');
var firebase  = (function(){
	var firebase_instance = null,users,rooms;
	function init(){
		return new Firebase('https://socket.firebaseio.com/');
	}
	return {
		getInstance: function(){
			if(!firebase_instance){
				firebase_instance = init();
			}
			console.log('Firebase Initiated');
			users = firebase_instance.child('users');
			users.once('value',function(data){
				if(data.val()){
					console.log(data.val());
					return
				}

				users.set({
				  shrikanth: {
				    full_name: "Shrikanth R"
				  }
				});
				rooms = users.child('rooms');
				rooms.push('test');

			});			
		return firebase_instance;
		}
	}	
})();
module.exports  = firebase;

