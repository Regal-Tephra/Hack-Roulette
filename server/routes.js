'use strict';
module.exports = (app, passport, handler) => {
  // OAuth routes
  app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email', 'read:org'] }),
    () => {}
  );
  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    handler.loggedInUser
  );

  // Add a user to the database
  app.get('/addUser', handler.isUser, (req, res) => {
    handler.addUser(req.user);
    res.redirect('/');
  });

  // See if a user is logged in
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

  // TODO: Take care of feedback postings
  app.post('/feedback', (req, res) => {
    console.log('Got stuff from feedback!');
    console.log(req.body);
    // Handle feedback
      // Send the name of the person
      // Send the feedback that needs to be sent
    const feedbackData = {
    };
    handler.addFeedback(feedbackData); // TODO: See what feedback is received
    res.status(200).json('Woo');
  });
  app.get('/logout', handler.logoutUser);
};
