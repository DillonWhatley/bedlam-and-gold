var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: Number,
    username: String,
    password: String,
    friendRequests: [String],
    friends: [String]
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
    },
    sendFriendRequest: function(sendee, recipient, callback) {
        User.findOneAndUpdate(
            { 'username': recipient },
            { $push: { friendRequests: sendee } },
            { safe: true, upsert: true },
            function(err, model) {
                console.log(err);
            }
        );


        //  return transientRecipient.friendRequests., callback);
    }
};

module.exports = userDAO;
