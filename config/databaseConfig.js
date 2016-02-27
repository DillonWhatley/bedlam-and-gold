//RFC 3986
function DatabaseConfig() {
  this.MongoConfig = {
    scheme: 'mongodb',
    authority: 'localhost',
    path: 'test'
  };
}

DatabaseConfig.prototype.getMongoURI = function() {
  return this.MongoConfig.scheme + '://' + this.MongoConfig.authority + '/' + this.MongoConfig.path;
};

var databaseConfig = module.exports = exports = new DatabaseConfig();
