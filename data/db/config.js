const mongoose = require('mongoose');
const uri = 'mongodb://localhost/green';
mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('mongodb connection open');
});

module.exports = db;
