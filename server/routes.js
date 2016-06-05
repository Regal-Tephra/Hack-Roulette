'use strict';
module.exports = (app, passport, handler) => {
  app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email', 'read:org'] }),
    () => {}
  );
  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    handler.loggedInUser
  );
  app.get('/addUser', handler.isUser, (req, res) => {
    handler.addUser(req.user.emails[0].value);
    res.redirect('/');
  });
  app.get('/loginCheck', (req, res) => {
    console.log(req.user);
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
    res.status(200).json('Woo');
  });
  app.get('/logout', handler.logoutUser);
};
