var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	email: {type: String, required: true, index: { unique: true } }
});

var User = mongoose.model('User', userSchema);

module.exports = User;