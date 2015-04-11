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
	
	function autheticate(data,callback){

		find(data.user_name,function(err,item){
			if(item && item.user_name && GLOBAL.bcrypt.compareSync(data.password, item.password) ){
				callback(item);
			}else{
				callback({error: 'Wrong username or password'});
			}
			
		});
		
	}
	function create(data,callback){
		find(data.user_name,function(err,item){
			if(item && item.user_name){
				callback({},item);
			}else{
				console.log('creating '+data.user_name);
				data.password = GLOBAL.bcrypt.hashSync(data.password, GLOBAL.bcrypt.genSaltSync(10));
				collection.insert(data,{w:1}, callback);
			}
			
		});
		
	}
	function find(user_name,callback){
		console.log('finding '+user_name);
		collection.findOne({user_name: user_name},callback );
	}
	return{
		find: find,
		autheticate: autheticate,
		create: create
	}
})();
