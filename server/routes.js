// const handlers = require('./request-handler.js');

'use strict';
module.exports = (app, passport, handler) => {
  app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email', 'read:org'] }),
    () => {}
  );
  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    handler.loggedInUser
  );

  app.get('/addUser', handler.isUser, (req, res) => {
    console.log(req.user);
    console.log('We are getting into addUser');
    handler.addUser(req.user);
    res.redirect('/');
  });

  app.get('/loginCheck', (req, res) => {
    // console.log(req.user);
    let data = '';
    req.on('data', d => {
      data = d + data;
    });
    req.on('end', () => {
      res.end(JSON.stringify(req.user));
    });
  });
  app.post('/feedback', (req, res) => {
    // TODO: Add feedback into the server
    console.log('Got stuff from feedback!');
    console.log(req.body);
    handler.addFeedback(); // TODO: See what feedback is received
    res.status(200).json('Woo');
  });
  app.get('/logout', handler.logoutUser);
};
