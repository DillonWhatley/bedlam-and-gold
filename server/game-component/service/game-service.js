var gameDAO = require('../data-access/game-dao');
var monsterService = require('./monster-service');
var GameService = function() {};

GameService.prototype.create = function(callback) {
  var game = new gameDAO.Game();
  monsterService.generateMonster(function(monster) {
    game.monsters = [];
    game.monsters.push(monster);
  });
  gameDAO.save(game, callback);
};

module.exports = new GameService();
