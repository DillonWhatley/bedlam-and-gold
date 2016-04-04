var gameDAO = require('../data-access/game-dao');
var GameService = function() {};

GameService.prototype.create = function(callback) {
  var game = new gameDAO.Game();
  gameDAO.save(game, callback);
};

module.exports = new GameService();
