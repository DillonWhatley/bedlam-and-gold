var gameService = require('../service/game-service');
var authenticationInterceptor = require('../../middleware/authentication-interceptor');
module.exports = function(app, io) {
  app.post('/game', authenticationInterceptor, function(request, response) {
    gameService.create(function(err, game) {
      if (err) {
        console.log('Error in db query.');
        response.sendStatus(400).send('Game could not be initialized.');
      }
      var gameInstance = io.of('/' + game.id);
      gameInstance.on('connection', function(socket) {
        console.log(request.session.passport.user + ' connected');
        gameInstance.emit('welcome', ['Welcome to game instance:' + game.id]);
        socket.on('disconnect', function() {
          console.log('user disconnected');
        });
      });
      setInterval(function() {
        var events = [];
        for (var i = 0; i < 10; i++) {
          events = events.concat(gameService.processEvent(game, null, null));
        }
        gameInstance.emit('game-world-event', events);
      }, 100);
      response.send({
        'data': game.id
      });
    });
  });
};
