
var express = require('express');

var app = express();
var port = process.env.PORT || 6660;

app.use(express.static('server/public'));

app.listen(port, function (req, res) {
  console.log('<3 welcome to channel ', port);
});
