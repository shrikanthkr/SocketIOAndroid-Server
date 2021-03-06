var port = process.env.PORT || 3000;
var redis_port = process.env.REDIS_PORT;
var redis_host = process.env.REDIS_HOST ;
 console.log('redis:'+redis_host);
/*var redis = require('redis').createClient(redis_port, redis_host);
redis.auth(process.env.REDIS_AUTH );
var adapter = require('socket.io-redis');*/
/*var pub = redis(process.env.REDIS_PORT || 6379, 
  process.env.REDIS_HOST ||  '127.0.0.1', 
  { auth_pass:  process.env.REDIS_AUTH + ""  });
var sub = redis(process.env.REDIS_PORT || 6379, process.env.REDIS_HOST ||  '127.0.0.1', { detect_buffers: true, auth_pass: process.env.REDIS_AUTH + ""  });

*/
var server = require('http').createServer(handler);

Io  = require('socket.io').listen(server);


/*Io.adapter(adapter({pubClient: redis, subClient: redis} ));

var redisIsReady = false;
redis.on('error', function(err) {
    redisIsReady = false;
    console.log('redis is not running');
    console.log(err);
});
redis.on('ready', function() {
    redisIsReady = true;
    console.log('redis is running');
});*/
_ = require('lodash');
Randtoken = require('rand-token');
TAG = "SOCKETIO";
Mongo = require('mongodb');
MongoClient = Mongo.MongoClient;
ObjectID = require('mongodb').ObjectID
Observer = require("node-observer");
Mongoose = require('mongoose');
Schema = Mongoose.Schema;
Relationship = require("mongoose-relationship");
console.log('Initiating Models');
Helpers = require('require-all')(__dirname + '/helpers');
Models = require('require-all')(__dirname + '/models');
/*Mongoose.connection.collections['users'].drop( function(err) {
    console.log('users collection dropped');
  });
  Mongoose.connection.collections['rooms'].drop( function(err) {
    console.log('rooms collection dropped');
  });*/
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
      console.log('params type'+data.constructor.name);

      try{
        data = JSON.parse(data);
        console.log(data);
        Controllers[route.controller][route.action].call(this,socket,data);
       
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
