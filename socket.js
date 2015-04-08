var server = require('http').createServer(handler);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var socket_handler = require('./socket_handler');
var Firebase = require('./firebase_handler').getInstance();

function handler (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('hello');
      res.write(':');
      res.end('World\n');
}


Firebase.on('child_added', function(dataSnapshot) {
    console.log("Fire base data received : "+JSON.stringify(dataSnapshot.val()));
    io.sockets.emit('receive',JSON.stringify(dataSnapshot.val()));
 });

io.on('connection', function(socket){
  socket_handler.push(socket);
  Firebase.once("value", function(dataSnapshot) {
	  	var intial_data = [],
	  	data = dataSnapshot.val();
	  	for(item in data){
	  		intial_data.push(data[item]);
	  	}
	    socket.emit('intial_data',JSON.stringify(intial_data));
  	},function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
	});
  socket.on('message', function(data){
    	 Firebase.push(data);
    });
  socket.on('disconnect', function(){
    socket_handler.delete(this);
  });
});
 


server.listen(port);