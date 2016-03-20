var gameDAO = require('../data-access/game-dao');
var monsterService = require('../monsters/monster-service');
var GameService = function() {};

GameService.prototype.create = function(callback) {
  var game = new gameDAO.Game();
  monsterService.generateMonster(function(monster) {
    game.monsters = [];
    game.monsters.push(monster);
  });
  gameDAO.save(game, callback);
};

GameService.prototype.processEvent = function(game, event, callback) {
  var results = [];
  for (var i = 0; i < game.monsters.length; i++) {
    results.push(game.monsters[i].attack());
  }
  return results;
};

module.exports = new GameService();
