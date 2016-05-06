var userService = require('../service/user-service');
var authenticationInterceptor = require('../../middleware/authentication-interceptor');
module.exports = function (app) {
    //validate username and other user properties, then create a new user
    app.post('/users', function (request, response) {
        userService.validateUsername(request.body, function (err, user) {
            if (err) {
                console.log('Error in db query.');
                response.sendStatus(400).send('Invalid username');
            }
            if (!user) {
                console.log('Username was valid.');
                userService.createUser(request.body, function (err, user) {
                    response.redirect('/login');
                });
            }
        });
    });

    //Get a user by their name
    app.get('/users/:username', authenticationInterceptor, function (request, response) {
        var user = userService.findByUsername(request.params.username, function (err, user) {
            if (err) {
                console.log(err);
                response.sendStatus(500).send('Could not find user by name');
            }
            response.send({
                'data': [user]
            });
        });
    });

    //Send friend request from req.user to attached username
    //TODO: change from body to request params
    app.post('/friends/:username', authenticationInterceptor, function (request, response) {
        console.log("picked up at the endpoint");
        console.log(request.body);
        var sendee = request.user;
        userService.sendFriendRequest(sendee, request.body.username, function (err, request) {
            if (err) {
                console.log(err);
                response.sendStatus(500).send('Could not find user by name');
            }
            response.send({
                'data': [user]
            });
        });
    });

    // TODO: Retrieve pending friend requests
    app.get('/friend-requests', authenticationInterceptor, function (request, response) {
        var sendee = request.user;
        console.log("testing123123123");
        userService.findPendingRequests(sendee.username, function (err, requests) {
            if (err) {
                console.log(err);
                response.sendStatus(500).send('Could not find user by name');
            }
            response.send({
                'data': requests
            });
        });
    });
    // TODO: And endpoint to accept friend request
    app.post('/users/friend-requests', authenticationInterceptor, function (request, response) {
        var sendee = request.user;
        console.log("accepting friend request endpoint for sendee.username:");
        console.log(sendee.username);
        userService.acceptFriend(sendee.username, request.body.username, function (err, request) {
            if (err) {
                console.log(err);
                response.sendStatus(500).send('Could not find user by name');
            }
            response.send({
                'data': request
            });
        });
    });
    
       app.post('/friends-deny/', authenticationInterceptor, function (request, response) {
        var sendee = request.user;
        console.log("denying friend request endpoint for sendee.username:");
        console.log(sendee.username);
        userService.denyFriend(sendee.username, request.body.username, function (err, request) {
            if (err) {
                console.log(err);
                response.sendStatus(500).send('Could not find user by name');
            }
            response.send({
                'data': request
            });
        });
    });
    
}