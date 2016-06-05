
const mongoose = require('mongoose');
const mongooseSchema = mongoose.Schema; // workaround for eslint new-cap error
const userSchema = mongooseSchema({
  email: { type: String, required: true, index: { unique: true } },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
