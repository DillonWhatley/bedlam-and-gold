var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//connect to the User store, but seperate security concerns from pure User
var AuthUserSchema = new Schema({
  username: String,
  password: String
});

AuthUserSchema.methods.validPassword = function(password) {
  if (password == this.password) {
    return true;
  }
  return false;
};

var AuthUser = mongoose.model('AuthUser', AuthUserSchema,
  'users'); // collection name

//convenience data access methods
var authenticationDAO = {
  AuthUser: AuthUser
};

module.exports = authenticationDAO;
