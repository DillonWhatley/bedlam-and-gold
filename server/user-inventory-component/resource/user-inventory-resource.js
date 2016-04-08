var userService = require('../../user-component/service/user-service');
var inventoryService = require('../../inventory-component/service/inventory-service');
var authenticationInterceptor = require('../../middleware/authentication-interceptor');
module.exports = function(app) {
  /*
   * Attempt to collect an item, identified by its id, and add it to the user's inventory.
   */
  app.post('/users/:username/inventory/:inventoryItemId/collectItem', authenticationInterceptor, function(request,
    response) {
    userService.findByUsername(request.params.username, function(err, user) {
      if (err) {
        console.log(err);
        response.sendStatus(500).send('Could not find user by name');
      }
      inventoryService.collectItem(request.params.inventoryItemId, function(err, inventoryItem) {
        if (!err) {
          //get user's inventory
          //if user has inventory item, then increment the count
          //else add the inventory item as a new inventory item to the user's inventory
        }
      });
    });
  });

  //Get a user by their name
  app.get('/users/:username/inventory', authenticationInterceptor, function(request, response) {
    var user = userService.findByUsername(request.params.username, function(err, user) {
      if (err) {
        console.log(err);
        response.sendStatus(500).send('Could not find user by name');
      }
      response.send({
        'data': [user.inventory]
      });
    });
  });
};
