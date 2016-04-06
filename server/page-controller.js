var passport = require('passport');
var authenticationInterceptor = require('./middleware/authentication-interceptor');
module.exports = function(app) {

  var servePage = function(request, response, fileName) {
    var options = {
      root: __dirname + '/../public/',
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

  app.get('/', authenticationInterceptor, function(request, response) {
    servePage(request, response, 'home.html');
  });

  app.get('/pages/*', authenticationInterceptor, function(request, response) {
    servePage(request, response, 'home.html');
  });

  app.get('/login', function(request, response) {
    servePage(request, response, 'login.html');
  });

  app.get('/create', function(request, response) {
    servePage(request, response, 'create.html');
  });

};
