var MongoClient = require('mongodb').MongoClient;
var mongo = (function(){
	var DB = null;

	function init(){
			MongoClient.connect("mongodb://localhost:27017/socketdb", function(err, db) {
				if(!err) {
					console.log("We are connected");
					console.log('Mongo Initiated');
					GLOBAL.DB = DB = db;
					createStructures();
					GLOBAL.observer.send(this, "db_init", db);
				}else{
					console.log('Not inititated');
				}
			});
	}

	function createStructures(){
		DB.createCollection('users', {w:1}, function(err, collection) {
			if(!err){
				console.log('users');
			}else{
				console.log(err);
			}
		});
		DB.createCollection('rooms', {w:1}, function(err, collection) {
			if(!err){
				console.log('rooms');
			}else{
				console.log(err);
			}
		});
		DB.createCollection('messages', {w:1}, function(err, collection) {
			if(!err){
				console.log('messages');
			}else{
				console.log(err);
			}
		});
	}
	function err(data){
		console.log(data);
	}
	init();
})();

module.exports = mongo;