var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MonsterSchema = new Schema({
  name: String,
  health: Number,
  mana: Number,
  attackPower: Number,
  defensePower: Number,
  level: Number
});

var Monster = mongoose.model('monster', MonsterSchema);

var monsterDAO = {
  Monster: Monster,
  save: function(monster, callback) {
    monster.save(function(err) {
      if (err) throw err;
      return callback(err, monster);
    });
  }
};

module.exports = monsterDAO;
