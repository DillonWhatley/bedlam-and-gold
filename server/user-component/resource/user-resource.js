var userService = require('../service/user-service');
var authenticationInterceptor = require('../../middleware/authentication-interceptor');
module.exports = function(app) {
  //validate username and other user properties, then create a new user
  app.post('/users', function(request, response) {
    userService.validateUsername(request.body, function(err, user) {
      if (err) {
        console.log('Error in db query.');
        response.sendStatus(400).send('Invalid username');
      }
      if (!user) {
        console.log('Username was valid.');
        userService.createUser(request.body, function(err, user) {
          response.redirect('/login');
        });
      }
    });
  });

  //Get a user by their name
  app.get('/users/:name', authenticationInterceptor, function(request, response) {
    var user = userService.getByName(request.params.name, function(err, user) {
      if (err) {
        console.log(err);
        response.sendStatus(500).send('Could not find user by name');
      }
      response.send({
        'data': [user]
      });
    });
  });
};
