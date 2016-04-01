var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AvatarSchema = new Schema({
  name: String,
  health: Number,
  mana: Number,
  attackPower: Number,
  defensePower: Number,
  level: Number,
  avatarClass: String
});

var Avatar = mongoose.model('avatar', AvatarSchema);

var avatarDAO = {
  Avatar: Avatar,
  findByName: function(name, callback) {
    return Avatar.findOne({
      'name': name
    }, callback);
  },
  save: function(avatar, callback) {
    avatar.save(function(err) {
      if (err) throw err;
      return callback(err, avatar);
    });
  },
  create: function(avatar, callback) {
    var transientAvatar = new Avatar(avatar);
    transientAvatar.save(function(err) {
      if (err) throw err;
      return callback(err, avatar);
    });
  }
};

module.exports = avatarDAO;
