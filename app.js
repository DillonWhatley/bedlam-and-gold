var express = require('express');
var databaseConfig = require('./config/databaseConfig');
var app = express();

var mongoose = require('mongoose');
mongoose.connect(databaseConfig.getMongoURI());

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/', function(req, res) {
  res.redirect('index.html');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
