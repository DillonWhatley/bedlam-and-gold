var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  monsters: Array
});

var Game = mongoose.model('game', GameSchema);

var gameDAO = {
  Game: Game,
  save: function(game, callback) {
    game.save(function(err) {
      if (err) throw err;
      return callback(err, game);
    });
  }
};

module.exports = gameDAO;
