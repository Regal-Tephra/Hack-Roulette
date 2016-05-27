var request = require('request');

var db = require('./data/db/config');
var User = require('./data/db/models/user');

exports.loggedInUser = function(req, res) {
   res.redirect('/');
};

exports.logoutUser = function(req, res) {
  req.logout();
  res.redirect('/login');
};

exports.isLoggedIn = function(req){
  if(req.user){
    return true;
  } else {
   return false;
  }
}

exports.isUser = function(req, res, next) {
  if (exports.isLoggedIn(req)) {
    next();
  } else {
    res.redirect('/login');
  }
};