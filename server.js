// do not change the order of these
const express = require('express');
const session = require('express-session');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const path = require('path');
const handler = require('./request-handler');

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const secrets = require('./keys.js');
const sessionOptions = { secret: 'some other thing!?' };

app.use(express.static(path.join(__dirname, 'public')));

// serialize and deserializeUser
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
// creates the req.user property when logged in
app.use(session(sessionOptions));

// need views to render this as script has to run on page load;
io.on('connection', socket => {
  console.log(socket);
  console.log('connected');
  socket.on('change', text => {
    console.log(text);
    socket.broadcast.emit('text change', text);
  });
});

// creates github strategy for our app
passport.use(new GitHubStrategy({
  clientID: secrets.GITHUB_CLIENT_ID,
  clientSecret: secrets.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() =>
    done(null, profile)
  );
}));

// creates sessions on our app
app.use(passport.initialize());
app.use(passport.session());

// attach to login button
app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email', 'read:org'] }),
  () => {

  }
);

// callback for auth
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  handler.loggedInUser
);

// logged in home page
app.get('/', handler.isUser, () => {
  // res.send('hello world, user is logged in as: ' + req.user.username);
});

// landing page
app.get('/login', (req, res) => {
  res.send('login page');
});

// logout request
app.get('/logout', handler.logoutUser);

server.listen(3000, () => {
  console.log('Tephra listening on port 3000!');
});
