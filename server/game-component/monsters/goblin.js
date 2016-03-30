var MonsterTypes = require('./monster-types');
var Goblin = function() {
  this.category = MonsterTypes.humanoid;
  this.name = "goblin";
  this.health = 25;
  this.mana = 25;
  this.attackPower = 1;
  this.defensePower = 1;
  this.level = 1;
};
Goblin.prototype.attack = function() {
  return "goblin attacked.";
};
module.exports = Goblin;
