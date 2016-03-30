var proxyquire = require('proxyquire');
var assert = require('assert');
var gameDAOStub = {};
var monsterServiceStub = {};
var gameService = proxyquire('../game-service', {
  '../data-access/game-dao': gameDAOStub,
  './monster-service': monsterServiceStub
});

describe('GameService', function() {
  describe('#create()', function() {
    this.timeout(10000);
    it('should return a new game instance', function(done) {
      gameDAOStub.save = function(game, callback) {
        return callback(game);
      };
      gameDAOStub.Game = function() {
        this.monsters = [];
      };
      monsterServiceStub.generateMonster = function(callback) {
        var monster = {};
        return callback(monster);
      };
      gameService.create(function(game) {
        assert.equal(1, game.monsters.length, 'No monsters were added');
        assert.notEqual(game, null, 'Game was not initialized.');
        done();
      });
    });
  });
});
