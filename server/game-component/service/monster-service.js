var monsterDAO = require('../data-access/monster-dao');

var MonsterService = function() {};

MonsterService.prototype.generateMonster = function(callback) {
  var monster = new monsterDAO.Monster({
    name: 'Orc',
    health: 100,
    mana: 50,
    attackPower: 5,
    defensePower: 10,
    level: 1
  });
  callback(monster);
};
module.exports = new MonsterService();
