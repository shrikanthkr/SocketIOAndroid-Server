var server = require('http').createServer();
var Firebase = require('firebase');
var rootRef = new Firebase('https://socket.firebaseio.com/');
var io = require('/usr/local/lib/node_modules/socket.io')(server);





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


server.listen(3000);