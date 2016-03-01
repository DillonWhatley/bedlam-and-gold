var express = require('express');
var databaseConfig = require('./config/databaseConfig');
var flash = require('connect-flash');
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(databaseConfig.getMongoURI());

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(flash());
app.use(session({
  secret: 'secretkey1'
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({
      username: username
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

var isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
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
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  })
);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
