var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  id: Number,
  name: String,
  username: String,
  password: String
});

userSchema.methods.validPassword = function(password) {
  if (password == this.password) {
    return true;
  }
  return false;
};

var User = mongoose.model('User', userSchema);

//convenience data access methods
var userDAO = {
  User: User,
  findByName: function(name, callback) {
    return User.findOne({
      'name': name
    }, callback);
  },
  create: function(user) {
    return new User(user);
  }
};

module.exports = userDAO;
