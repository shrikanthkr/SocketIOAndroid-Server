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


io.on('connection', function(socket){
    rootRef.off('child_added');
    rootRef.on('child_added', function(dataSnapshot) {
        console.log("Fire base set : "+JSON.stringify(dataSnapshot.val()));
        socket.emit('receive',JSON.stringify(dataSnapshot.val()));
     });
  socket.on('disconnect', function(){
    rootRef.off('child_added');
  });
  socket.on('message', function(data){
        console.log("Push Data: "+ data);
    	 rootRef.push(data );
    });
});


server.listen(port);