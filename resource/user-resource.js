module.exports = function(app, user) {
  if (!app) {
    console.error("Application not initialized.");
  }
  if (!user) {
    console.error('User model not initialized');
  }
  app.get('/users/:name', function(request, response) {
    console.log('return users');
    user.findByName(request.params.name, function(err, user) {
      response.send({
        'data': [user]
      });
    });

  });
};
