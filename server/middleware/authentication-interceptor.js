module.exports = function(req, res, next) {
  if (req.session.passport && req.session.passport.user) {
    return next();
  }
  res.redirect('/login');
};
