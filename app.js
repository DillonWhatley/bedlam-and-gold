var express = require('express');
var databaseConfig = require('./server/config/databaseConfig');
var flash = require('connect-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 3000;
var mongoose = require('mongoose');
mongoose.connect(databaseConfig.getMongoURI());

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(flash());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'secretkey1',
  cookie: {
    maxAge: 600000
  },
  resave: false,
  saveUninitialized: false
}));
/*** Initialize Application Services ***/
require('./server/security-component/authentication-initializer')(app);
var authenticationResource = require('./server/security-component/resource/authentication-resource')(app);
var userResource = require('./server/user-component/resource/user-resource')(app);
var pageController = require('./server/page-controller')(app);

io.on('connection', function(socket) {
  console.log(" a user connected");
  socket.emit('news', {
    hello: 'world'
  });
  socket.on('message', function(data) {
    io.emit('server-messages', [
      data.message
    ]);
  });
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

server.listen(port, function() {
  console.log('Server listening at port %d', port);
});
