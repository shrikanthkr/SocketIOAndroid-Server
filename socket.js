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
  rootRef.on("value", function(dataSnapshot) {
    	io.sockets.emit('receive',JSON.stringify(dataSnapshot.val()));
  	},function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
	});
  socket.on('message', function(data){
    	 rootRef.push(data );
    });
});
 


server.listen(port);