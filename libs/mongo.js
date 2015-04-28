var mongo = (function(){
	var DB = null;
	var username = process.env.MONGO_HQ_USERNAME,
	password = process.env.MONGO_HQ_PASSWORD,
	mongo_url = "mongodb://"+username+":"+password+"@dogen.mongohq.com:10006/socketio_sandbox";
	function init(){
		console.log("Initializing Mongo");
			MongoClient.connect(mongo_url, function(err, db) {
				if(!err) {
					console.log("We are connected");
					console.log('Mongo Initiated');
					Observer.send(this, "db_init", db);
				}else{
					console.log('Not inititated : ' + err);
				}
			});
	}
	function err(data){
		console.log(data);
	}
	init();
})();

module.exports = mongo;