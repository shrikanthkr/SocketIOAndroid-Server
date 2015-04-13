var server = require('http').createServer(handler);
var io  = GLOBAL.io= require('socket.io')(server);
var port = process.env.PORT || 3000;
var configs = require('require-all')(__dirname + '/configs');
Controllers = require('require-all')(__dirname + '/controllers');

Observer = require("node-observer");

Observer.subscribe(this, "db_init", function(who, data) {
  console.log('Initiating Models');
  DB = data;
  Models = require('require-all')(__dirname + '/models');
});
Bcrypt = require('bcryptjs');
Libs = require('require-all')(__dirname + '/libs');
function handler (req, res) {
 res.writeHead(200, {'Content-Type': 'text/plain'});
 res.write('hello');
 res.write(':');
 res.end('World\n');
}

io.on('connection', function(socket){
  configs.router.forEach(function(route){
    socket.on(route.url,function(data){
      console.log('To ' + route.controller+":"+route.action);
      Controllers[route.controller][route.action].call(this,socket,data);
    });
  });

  socket.on('disconnect', function(){
    console.log('Socket disconnectd:' + socket.id);
    console.log("Room length"+ socket.rooms.length);
  });
});



server.listen(port);