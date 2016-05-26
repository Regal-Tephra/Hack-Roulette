var mongoose = require('mongoose');
var uri = 'mongodb://localhost/green';
mongoose.connect(uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongodb connection open')
});

module.exports = db;