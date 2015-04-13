var MongoClient = require('mongodb').MongoClient;
var mongo = (function(){
	var DB = null;

	function init(){
			MongoClient.connect("mongodb://localhost:27017/socketdb", function(err, db) {
				if(!err) {
					console.log("We are connected");
					console.log('Mongo Initiated');
					Observer.send(this, "db_init", db);
				}else{
					console.log('Not inititated');
				}
			});
	}
	function err(data){
		console.log(data);
	}
	init();
})();

module.exports = mongo;