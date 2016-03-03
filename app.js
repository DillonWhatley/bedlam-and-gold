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
var user = require('./model/user');
var userResource = require('./resource/user-resource')(app, user);

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(flash());
app.use(cookieParser());
app.use(bodyParser());
app.use(session({
  secret: 'secretkey1',
  cookie: {
    maxAge: 60000
  }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
  function(username, password, done) {
    user.findOne({
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
  user.findById(id, function(err, user) {
    done(err, user);
  });
});

var isAuthenticated = function(req, res, next) {
  if (req.session.passport && req.session.passport.user) {
    return next();
  }
  res.redirect('/login');
};

app.get('/', isAuthenticated, function(req, res) {
  res.redirect('home.html');
});

app.get('/login', function(request, response) {
  response.redirect('login.html');
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
  testFunction();
});


var testFunction = function(username, password) {
  user.findOne({
    'username': 'Bob'
  });
};
