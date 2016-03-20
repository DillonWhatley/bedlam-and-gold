var monsterDAO = require('./data-access/monster-dao');
var Goblin = require('./goblin');
var MonsterService = function() {};

MonsterService.prototype.generateMonster = function(callback) {
  var goblin = new Goblin();
  callback(goblin);
};
module.exports = new MonsterService();
