var avatarDAO = require('./data-access/avatar-dao');
var AvatarService = function() {};

AvatarService.prototype.create = function(name, avatarClass, callback) {
  var avatar = {
    name: name,
    avatarClass: avatarClass
  };
  avatarDAO.create(avatar, callback);
};
module.exports = new AvatarService();
