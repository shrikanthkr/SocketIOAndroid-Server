var server = require('http').createServer(handler);
var Firebase = require('firebase');
var rootRef = new Firebase('https://socket.firebaseio.com/');
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

function handler (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('hello');
      res.write(':');
      res.end('World\n');
}


rootRef.on('child_added', function(dataSnapshot) {
    console.log("Fire base set : "+JSON.stringify(dataSnapshot.val()));
    io.sockets.emit('receive',JSON.stringify(dataSnapshot.val()));
 });

io.on('connection', function(socket){
  rootRef.once("value", function(dataSnapshot) {
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
    	 rootRef.push(data );
    });
});
 


server.listen(port);