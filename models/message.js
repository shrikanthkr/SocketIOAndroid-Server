DB.createCollection('messages', {w:1}, function(err, collection) {
			if(!err){
				console.log('messages');
			}else{
				console.log(err);
			}
		});
Message = (function(){
	
})();