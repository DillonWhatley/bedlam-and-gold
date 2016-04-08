var userDAO = require('../data-access/user-dao');
var UserService = function() {};

UserService.prototype.createUser = function(user, callback) {
  console.log('Creating User.');
  userDAO.create(user, callback);
};

// Middleware for validating uniqueness of new user and creating said user
// Checks if an user with the same username is already in use.
UserService.prototype.validateUsername = function(user, callback) {
  console.log("Validating username.");
  var serviceCallback = function(err, user) {
    console.log("Do something with user before passing it to resource.");
    console.log(user);
    return callback(err, user);
  };
  userDAO.User.findOne({
    'username': user.username
  }, serviceCallback);
};

UserService.prototype.findByUsername = function(name, callback) {
  return userDAO.findByUsername(name, callback);
};

UserService.prototype.updateUserInventory = function(username, updatedUserInventory) {
  userDAO.findByUsername(username, function(err, user) {
    user.update({
      inventory: updatedUserInventory
    }, function(err, raw) {
      if (err) {
        console.log(err);
      }
    });
  });
};

module.exports = new UserService();
