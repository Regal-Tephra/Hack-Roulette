'use strict';
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
  if (exports.isLoggedIn(req)) {
    next();
  } else {
    res.redirect('/#/login');
  }
};

exports.addUser = (userProfile) => {
  User.find({ githubID: userProfile.id }, (err, userData) => {
    console.log('We got a response from the database');
    if (err) {
      console.error(err);
      return null;
    }
    // if email isn't in database, add new User entry, else do nothing
    if (userData.length === 0) {
      const user = new User({
        githubID: userProfile.id,
        primaryEmail: userProfile.emails[0].value,
        githubDisplayName: userProfile.displayName,
        githubUsername: userProfile.username,
        helpRequests: [],
        helperSessions: [],
        helperFeedback: [],
      });
      console.log('We are adding into db');
      // save the new user into the DB
      user.save((saveErr, newUser) => {
        if (err) {
          console.error(saveErr);
          return;
        }
        console.log(`${newUser} has been added.`);
      });
    } else {
      console.log('User already exists.');
    }
    return null;
  });
};

exports.addFeedback = (usertoApplyFeedbackTo, feedback) => {
  // Find the user that the feedback should apply to
  User.findOne({ githubID: usertoApplyFeedbackTo }, (err, userData) => {
    console.log('We got a response from the database');
    if (err) {
      console.error(err);
      return null;
    }

    userData.helperFeedback.push(feedback);
    // if email isn't in database, add new User entry, else do nothing
    userData.save((saveErr, newUser) => {
      if (err) {
        console.error(saveErr);
        return;
      }
      console.log(`${newUser} feedback has been added to the DB.`);
    });
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

exports.findIndexOfProperty = (array, property, target) => {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    if (array[i][property] === target) {
      return i;
    }
  }
  return null;
};
