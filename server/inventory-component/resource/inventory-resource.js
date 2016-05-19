var authenticationInterceptor = require('../../middleware/authentication-interceptor');
var inventoryService = require('../service/inventory-service');
var userService = require('../../user-component/service/user-service');
module.exports = function(app, io) {
  app.get('/users/:username/inventoryItems', authenticationInterceptor, function(request, response) {
    userService.findByUsername(request.params.username, function(error, user) {
      inventoryService.findByUser(user, function(err, inventoryItems) {
        if (err) {
          console.log(err);
          response.status(500).send('Could not find inventory items for user.');
        }
        response.send({
          'data': inventoryItems
        });
      });
    });
  });
};
