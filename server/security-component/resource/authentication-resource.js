var passport = require('passport');
module.exports = function(app) {

  app.post('/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })
  );

  app.post('/logout', function(req, res) {
    req.logout();
    res.send({
      'data': '/login'
    });
  });
};
