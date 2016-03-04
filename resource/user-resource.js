module.exports = function(app, userDAO) {
  if (!app) {
    console.error("Application not initialized.");
  }
  if (!userDAO) {
    console.error('User model not initialized');
  }
  app.get('/users/:name', function(request, response) {
    userDAO.findByName(request.params.name, function(err, user) {
      if (err) {
        console.log(err);
        response.send('An error has occurred');
      }
      response.send({
        'data': [user]
      });
    });

  });
};
