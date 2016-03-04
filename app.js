var express = require('express');
var databaseConfig = require('./config/databaseConfig');
var flash = require('connect-flash');
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(databaseConfig.getMongoURI());

/* Models */
var userDAO = require('./model/userDAO');
var userResource = require('./resource/user-resource')(app, userDAO);

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
    maxAge: 60000
  },
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
  function(username, password, done) {
    userDAO.User.findOne({
      'username': username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  userDAO.User.findById(id, function(err, user) {
    done(err, user);
  });
});

var isAuthenticated = function(req, res, next) {
  if (req.session.passport && req.session.passport.user) {
    return next();
  }
  res.redirect('/login');
};

var servePage = function(request, response, fileName) {
  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };
  response.sendFile(fileName, options, function(err) {
    if (err) {
      console.log(err);
      response.status(err.status).end();
    } else {
      console.log('Sent:', fileName);
    }
  });
};

app.get('/', isAuthenticated, function(request, response) {
  servePage(request, response, 'home.html');
});

app.get('/login', function(request, response) {
  servePage(request, response, 'login.html');
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
