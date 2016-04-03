var avatarDAO = require('./data-access/avatar-dao');
var AvatarService = function() {};

AvatarService.prototype.create = function(name, avatarClass, callback) {
  var avatar = {
    name: name,
    avatarClass: avatarClass,
    userId: userId
  };
  avatarDAO.create(avatar, callback);
};

AvatarService.prototype.findByName = function(name, callback) {
  avatarDAO.findByNameAndUserId(name, userId, callback);
};

module.exports = new AvatarService();
