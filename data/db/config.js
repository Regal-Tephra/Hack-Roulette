var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:3000/green')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongodb connection open')
});

module.exports = db;