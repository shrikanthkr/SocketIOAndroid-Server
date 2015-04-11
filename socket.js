var server = require('http').createServer(handler);
var io  = GLOBAL.io= require('socket.io')(server);
var port = process.env.PORT || 3000;
var socket_handler = require('./socket_handler');
var models ;
GLOBAL.observer = require("node-observer");
var configs = require('require-all')(__dirname + '/configs');
var controllers = require('require-all')(__dirname + '/controllers');
GLOBAL.observer.subscribe(this, "db_init", function(who, data) {
  console.log('model started');
    GLOBAL.models = require('require-all')(__dirname + '/models');
});

GLOBAL.libs = require('require-all')({
  dirname     :  __dirname + '/libs',
  resolve     : function (libs) {
    return libs;
  }
});
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
      controllers[route.controller][route.action].call(this,socket,data);
    });
  });
  socket.on('disconnect', function(){
    console.log('Socket disconnectd:' + socket.id);
    console.log("Room length"+ socket.rooms.length);
  });
});



server.listen(port);