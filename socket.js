var port = process.env.PORT || 3000;
var redis = require('socket.io-redis');

var sticky = require('sticky-session');
var server = require('http').createServer(handler),
redis = require('socket.io-redis')  // socket.ioにredisがある
    , redisConf = { host: '127.0.0.1', port: 6379 };

Io  = require('socket.io').listen(server);
Io.adapter(redis({
    redisPub: redisConf,
    redisSub: redisConf,
    redisClient: redisConf
}));
TAG = "SOCKETIO";
Mongo = require('mongodb');
MongoClient = Mongo.MongoClient;
ObjectID = require('mongodb').ObjectID
Observer = require("node-observer");


Observer.subscribe(this, "db_init", function(who, data) {
  console.log('Initiating Models');
  DB = data;
  Models = require('require-all')(__dirname + '/models');
});
Bcrypt = require('bcryptjs');
Libs = require('require-all')(__dirname + '/libs');

var configs = require('require-all')(__dirname + '/configs');
Controllers = require('require-all')(__dirname + '/controllers');

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

      try{
        data = (data instanceof String) ? JSON.parse(data):data;
        Controllers[route.controller][route.action].call(this,socket,data);
        console.log(data);
      }catch(e){
        console.log(e);
        socket.emit(route.url,e.message);
      }
      
      
      
    });
  });

  socket.on('disconnect', function(){
    console.log('Socket disconnectd:' + socket.id);
    console.log("Room length"+ socket.rooms.length);
  });

});

server.listen(port,function(){
  console.log("Server on:"+ port)
});

