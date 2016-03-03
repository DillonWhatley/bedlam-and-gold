var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  id: Number,
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

module.exports = User;
