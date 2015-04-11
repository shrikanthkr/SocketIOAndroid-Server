module.exports = (function(){
	var collection = GLOBAL.DB.collection('users');
	var user_name, display_name, password, email,flash_message;

	function init(data){
		this.user_name = data.user_name;
		this.display_name = data.display_name;
		this.email = data.email;
		this.password = data.password;
		this.flash_message
	} 
	
	function insert(data,callback){

		find(data.user_name,function(err,item){
			console.log(item);
			if(item && item.user_name){
				callback(item);
			}else{
				callback({error: 'Wrong username or password'});
			}
			
		});
		
	}
	function create_user(data,callback){
		collection.insert(data,{w:1}, callback);
	}
	function find(user_name,callback){
		console.log('finding '+user_name);
		collection.findOne({user_name: user_name},callback );
	}
	return{
		find: find,
		insert: insert
	}
})();
