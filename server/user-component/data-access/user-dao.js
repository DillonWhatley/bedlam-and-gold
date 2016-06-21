var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');
var reqCounter;
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
    findByUsername: function (username, callback) {
        return User.findOne({
            'username': username
        }, callback);
    },
    create: function (user, callback) {
        var transientUser = new User(user);
        transientUser.save(function (err) {
            if (err) throw err;
            return callback(err, user);
        });
    },
    sendFriendRequest: function (sendee, recipient, callback) {
        console.log("inside DAO request");
        var notRequested;
        var notFriends;

        async.series([
            function (callback) {
                User.find({ 'username': recipient, 'friendRequests': sendee }, 
                function (err, users) {
                    if (users.length == 0) {
                        notRequested = true;
                        callback();
                    }
                 });
            },

            function (callback) {
                User.find({ 'username': recipient, 'friends': sendee }, 
                function (err, users) {
                    if (users.length == 0){
                        notFriends = true;
                        callback();
                    }
                });
            }],
            function (err, results){
                if (notRequested == true && notFriends == true){
                        User.findOneAndUpdate(
                            { 'username': recipient },
                            { $push: { friendRequests: sendee } },
                            { safe: true, upsert: true },
                            function (err, model) {
                                console.log(err);
                            }
                        );
                }
            }
        );






        // async.series({
        //         one: function (callback) {
        //             console.log("function 1");
        //             notRequested = false;
        //             notFriends = false;
        //             callback(null);
        //         },
        //         two: function (callback) {
        //             console.log("function 2");
        //             User.count(User.find({ 'username': recipient, 'friendRequests': sendee }),
        //                 function (err, count) {
        //                     if (count == 0) {
        //                         notRequested = true;
        //                         callback(null, notRequested);
        //                     }
        //                 }
        //             )

        //         },
        //         three: function (callback) {
        //             console.log("function 3");
        //             User.count(User.find({ 'username': recipient, 'friends': sendee }),
        //                 function (err, count) {
        //                     if (count == 0) {
        //                         notFriends = true;
        //                         callback(notFriends);
        //                     }
        //                 }
        //             )

        //         }
        //     },
        //         function (err, results) {
        //             console.log("function 4" + results);
        //             console.log("friends: " + results[0] + "request: " + results[1]);
        //             if (notFriends == true && notRequested == true) {
                        // User.findOneAndUpdate(
                        //     { 'username': recipient },
                        //     { $push: { friendRequests: sendee } },
                        //     { safe: true, upsert: true },
                        //     function (err, model) {
                        //         console.log(err);
                        //     }
                        // );
        //             }
        //         }
        //     )

        //    var requestCheck = User.count(User.find({ 'username': recipient, 'friendRequests':sendee }), 
        //                                      function(err, count) { 
        //                                         if (count == 0){
        //                                             notRequested = true;
        //                                         } 
        //                                     }
        //                             );
        //     var friendCheck = User.count(User.find({ 'username': recipient, 'friends':sendee }), 
        //             function(err, count) { 
        //             if (count == 0){
        //                 notFriends = true;
        //             } 
        //         }
        //      );

        //    if (notFriends == true && notRequested == true){
        //          User.findOneAndUpdate(
        //             { 'username': recipient },
        //             { $push: { friendRequests: sendee } },
        //             { safe: true, upsert: true },
        //             function (err, model) {
        //                 console.log(err);
        //             }
        //         );
        //    }
        //TODO: Check if already friends

    },

    //TODO: Fetch pending friend requests
    findPendingRequests: function (sendee, callback) {
        User.findOne(
            { 'username': sendee },
            'friendRequests',
            callback);
    },

    //TODO: Add acceptFriendRequest method and remove from pending requests
    acceptFriend: function (sendee, newFriend, callback) {
        User.findOneAndUpdate(
            { 'username': sendee },
            {
                $pull: { friendRequests: newFriend },
                $push: { friends: newFriend }
            },
            { safe: true },
            function (err, model) {
                console.log(err);
            }
        );
        User.findOneAndUpdate(
            { 'username': newFriend },
            { $push: { friends: sendee } },
            { safe: true },
            function (err, model) {
                console.log(err);
            }
        );
    },

    denyFriend: function (sendee, newFriend, callback) {
        User.findOneAndUpdate(
            { 'username': sendee },
            { $pull: { friendRequests: newFriend } },
            { safe: true },
            function (err, model) {
                console.log(err);
            }
        );
    }
}

module.exports = userDAO;
