var express = require('express');
var session = require('express-session');
var app = express();
var path = require('path');
var handler = require('./request-handler');

var passport = require('passport');
var gitHubStrategy = require('passport-github2').Strategy;
var secrets = require('./keys.js');
var sessionOptions = { secret: 'some other thing!?' };

// app.use(express.static(path.join(__dirname,'public')));

// serialize and deserializeUser 
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
//creates the req.user property when logged in
app.use(session(sessionOptions));


//creates github strategy for our app
passport.use(new gitHubStrategy({
  clientID: secrets.GITHUB_CLIENT_ID,
  clientSecret: secrets.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
}, function(accessToken, refreshToken, profile, done) { 
  process.nextTick(function() {
    return done(null, profile);
  });
}));

//creates sessions on our app
app.use(passport.initialize());
app.use(passport.session());

// attach to login button
app.get('/auth/github', 
  passport.authenticate('github', {scope: ['user:email', 'read:org']}),
  function(req, res) {

  }
);

// callback for auth
app.get('/auth/github/callback',
  passport.authenticate('github', {failureRedirect: '/login'}),
  handler.loggedInUser
);

//logged in home page
app.get('/', handler.isUser, function(req, res) {
  res.send('hello world, user is logged in as: ' + req.user.username);
});

//landing page
app.get('/login', function(req, res){
  res.send('not logged in');
});

//logout request
app.get('/logout', handler.logoutUser);

app.listen(3000, function () {
  console.log('Tephra listening on port 3000!');
});