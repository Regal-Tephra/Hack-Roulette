// do not change the order of these
const _ = require('underscore');
const express = require('express');
const session = require('express-session');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
// const Queue = require('./queue');

const path = require('path');
const handler = require('./request-handler');

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const secrets = require('./keys.js');
const sessionOptions = { secret: 'some other thing!?' };

app.use(express.static(path.join(__dirname, 'public')));

// create queue for helper messages
const queue = [];

// serialize and deserializeUser
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
// creates the req.user property when logged in
app.use(session(sessionOptions));

const clients = {};

// HelperView Socket Event Handlers
const helperViewConnectionIO = socket => {
  socket.on('queued', userId => {
    console.log(userId);
    clients[userId] = socket;
    queue.push(userId);
    console.log(queue);
    socket.broadcast.emit('queueList', queue);
  });

  socket.on('initialGetQueueList', () => {
    socket.broadcast.emit('queueList', queue);
    console.log(queue);
  });
};


// ScreenShareView Socket Event Handlers
const screenShareViewConnectionIO = socket => {
  socket.on('change', text => {
    console.log(text);
    socket.broadcast.emit('text change', text);
  });
  socket.on('connectUser', userId => {
    console.log(userId);
    clients[userId] = socket;
    console.log('  Clients:', Object.keys(clients));
  });
  socket.on('disconnect', () => {
    _.each(clients, (clientSocket, userId) => {
      if (clientSocket === socket) {
        delete clients[userId];
        console.log('Disconnected:', userId);
      }
    });
    console.log('  Clients:', Object.keys(clients));
  });
};

// need views to render this as script has to run on page load;
io.on('connection', socket => {
  console.log('connected', socket.id);

  socket.on('initializeConnection', connectionType => {
    console.log('Initializing Connection', connectionType);
    if (connectionType === 'HelperView') helperViewConnectionIO(socket);
    else if (connectionType === 'ScreenShareView') screenShareViewConnectionIO(socket);
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

app.get('/addUser', handler.isUser, (req, res) => {
  handler.addUser(req.user.emails[0].value);
  res.redirect('/');
});

// logged in home page
app.get('/', handler.isUser, () => {
  // console.log('hello world, user is logged in as: ' + req.user.username);
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
