var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  inventory: Array
});

var User = mongoose.model('User', userSchema);

//convenience data access methods
var userDAO = {
  User: User,
  findByUsername: function(username, callback) {
    return User.findOne({
      'username': username
    }, callback);
  },
  create: function(user, callback) {
    var transientUser = new User(user);
    transientUser.save(function(err, user) {
      if (err) throw err;
      return callback(err, user);
    });
  }
};

module.exports = userDAO;
