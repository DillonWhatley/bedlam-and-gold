var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  id: Number,
  username: String,
  password: String
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
    transientUser.save(function(err) {
      if (err) throw err;
      return callback(err, user);
    });
  }
};

module.exports = userDAO;
