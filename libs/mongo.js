var mongo = (function(){
	var username = process.env.MONGO_HQ_USERNAME,
	password = process.env.MONGO_HQ_PASSWORD,
	mongo_url = "mongodb://"+username+":"+password+"@dogen.mongohq.com:10006/socketio_sandbox";
	Mongoose.connect(mongo_url);
})();

module.exports = mongo;