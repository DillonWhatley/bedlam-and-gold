var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var authenticationDAO = require('./data-access/authentication-dao');
module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(
    function(username, password, done) {
      authenticationDAO.AuthUser.findOne({
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
    authenticationDAO.AuthUser.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
