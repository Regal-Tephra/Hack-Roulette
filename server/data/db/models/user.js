
const mongoose = require('mongoose');
const mongooseSchema = mongoose.Schema; // workaround for eslint new-cap error
const userSchema = mongooseSchema({
  githubID: String,
  primaryEmail: String,
  githubDisplayName: String,
  githubUsername: String,
  helpRequests: Array,
  helperSessions: Array,
  helperFeedback: Array,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
