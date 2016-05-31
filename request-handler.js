var request = require('request');

var db = require('./data/db/config');
var User = require('./data/db/models/user');

exports.loggedInUser = function(req, res) {
   res.redirect('/addUser');
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

exports.addUser = function(email) {
  User.find(function(err, userEmail) {
    if(err) {
      return console.error(err);
    }

    //if email isn't in database, add new User entry, else do nothing
    if(userEmail.length === 0) {
      //new user stored into a variable
      var user = new User({
        email: email
      });
      //save the new user into the DB
      user.save(function(err, newUser) {
        if(err) {
          return console.error(err);
        } else {
          console.log(newUser.email + ' has been added.');
        }
      });
    } else {
      console.log('User email already exists.');
    }
  });
};

exports.wipeUserEntries = function() {
  User.remove({}, function(err, users) {
    if(err) {
      console.error(err);
    } else {
      console.dir('Deleted all users.');
    }
  });
}