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

// TODO: modify method to use userDAO methods to first check that user is not already friends/no pending request
UserService.prototype.sendFriendRequest = function(sendee, recipient, callback){
    var sendeeName = sendee.username;
    console.log("Server UserService Sending Friend Request.");
    console.log("sendee: "+ sendeeName + " recipient: " + recipient);
    
    return userDAO.sendFriendRequest(sendeeName, recipient, callback);
};

// TODO: Add method that returns pending friend requests
UserService.prototype.findPendingRequests = function(sendee, callback){
  return userDAO.findPendingRequests(sendee, callback);
};

// TODO: Add method that uses userDAO and accepts friend request
UserService.prototype.acceptFriend = function(sendee, newFriend, callback){
  return userDAO.acceptFriend(sendee, newFriend, callback);
};
UserService.prototype.denyFriend = function(sendee, newFriend, callback){
  return userDAO.denyFriend(sendee, newFriend, callback);
};



module.exports = new UserService();
