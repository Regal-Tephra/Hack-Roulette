// do not change the order of these
const express = require('express');
const session = require('express-session');
const http = require('http');
const handler = require('./request-handler');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
// const sharedSession = require('express-socket.io-session');

app.use(express.static(`${__dirname}/../public`));  // Static pages
app.use(morgan('combined')); // logging
app.use(bodyParser.json());  // body parsing
app.use(bodyParser.urlencoded({ extended: false }));

const passport = require('./setupPassport');

// creates the req.user property when logged in
const sessionMiddleware = session({
  secret: 'some other thing!?',
  resave: true,
  saveUninitialized: true,
});
app.use(sessionMiddleware);
// io.use(sharedSession(sessionMiddleware, { autoSave: true }));


// Socket Event Listeners
const helpRequestsListeners = require('./helpRequestsListeners');
const screenShareViewListeners = require('./screenshareRequestsListeners');
io.on('connection', socket => {
  socket.on('initializeConnection', connectionType => {
    if (connectionType === 'HelpRequests') helpRequestsListeners(socket);
    else if (connectionType === 'ScreenShareView') screenShareViewListeners(socket);
  });
});


app.use(passport.initialize());
const passportSessionMiddleware = passport.session();
app.use(passportSessionMiddleware);
// io.use(sharedSession(passportSessionMiddleware, { autoSave: true }));

require('./routes.js')(app, passport, handler);

server.listen(3000, () => {
  console.log('Tephra listening on port 3000!');
});
