// const request = require('request');

// const db = require('./data/db/config');
const User = require('./data/db/models/user');

exports.loggedInUser = (req, res) => {
  res.redirect('/addUser');
};

exports.logoutUser = (req, res) => {
  req.logout();
  res.redirect('/login');
};

exports.isLoggedIn = (req) => {
  if (req.user) {
    return true;
  }
  return false;
};

exports.isUser = (req, res, next) => {
  console.log('req', req);
  if (exports.isLoggedIn(req)) {
    next();
  } else {
    res.redirect('/#/login');
  }
};

exports.addUser = (email) => {
  User.find((err, userEmail) => {
    if (err) {
      console.error(err);
      return null;
    }

    // if email isn't in database, add new User entry, else do nothing
    if (userEmail.length === 0) {
      // new user stored into a variable
      const user = new User({ email });
      // save the new user into the DB
      user.save((saveErr, newUser) => {
        if (err) {
          console.error(saveErr);
          return;
        }
        console.log(`${newUser.email} has been added.`);
      });
    } else {
      console.log('User email already exists.');
    }
    return null;
  });
};

exports.wipeUserEntries = () => {
  User.remove({}, err => {
    if (err) {
      console.error(err);
    } else {
      console.dir('Deleted all users.');
    }
  });
};
