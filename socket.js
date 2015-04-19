var server = require('http').createServer(handler);
Io  = GLOBAL.io= require('socket.io')(server);
var port = process.env.PORT || 3000;
TAG = "SOCKETIO";
Mongo = require('mongodb');
MongoClient = Mongo.MongoClient;
ObjectID = require('mongodb').ObjectID
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
  var fs = require('fs');
var index = fs.readFileSync('index.html');
 res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index);
}

Io.on('connection', function(socket){
  configs.router.forEach(function(route){
    socket.on(route.url,function(data){
      console.log('To ' + route.controller+":"+route.action);
      console.log('params');
      data = JSON.parse(data);
      console.log(data);
      Controllers[route.controller][route.action].call(this,socket,data);
    });
  });

  socket.on('disconnect', function(){
    console.log('Socket disconnectd:' + socket.id);
    console.log("Room length"+ socket.rooms.length);
  });
});



server.listen(port);
