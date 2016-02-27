var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/', function(req, res) {
  res.redirect('index.html');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
