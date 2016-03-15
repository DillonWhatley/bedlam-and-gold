var assert = require('assert');
var gameService = require('../game-service');
var databaseConfig = require('../../../config/databaseConfig');
var mongoose = require('mongoose');
mongoose.connect(databaseConfig.getMongoURI());

describe('GameService', function() {
  describe('#create()', function() {
    this.timeout(10000);
    it('should return a new game instance', function(done) {
      gameService.create(function(err, game) {
        assert.equal(1, game.monsters.length, 'No monsters were added');
        assert.notEqual(game, null, 'Game was not initialized.');
        done();
      });
    });
  });
});
