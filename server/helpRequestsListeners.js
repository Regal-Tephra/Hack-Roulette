'use strict';
const handler = require('./request-handler');
const User = require('./data/db/models/user');

// Start with a random room number and increment from there
let helpRequestID = Math.floor(Math.random() * 10000);
const helpRequestsQueue = [];

module.exports = io => {
  io.of('/help-requests').on('connection', socket => {
    // Send current help request list when asked by client
    socket.on('getCurrentQueueList', () => {
      socket.emit('queueList', helpRequestsQueue);
    });

    // Add to request queue when a request is made
    socket.on('addRequest', (message, respond) => {
      console.log('This is the message received', message);
      const newHelpRequest = {
        id: ++helpRequestID,
        text: message.requestText,
        languageChosen: message.languageChosen,
        client1sessionID: message.client1sessionID,
        userData: message.userData,
      };
      helpRequestsQueue.push(newHelpRequest);

      // Associate the help request with the user in the database
      User.findOne({ githubID: message.userData.githubID }, (err, userDataFromDB) => {
        if (err) {
          console.error(err);
          return null;
        }
        console.log('This is the userData', userDataFromDB);
        userDataFromDB.helpRequests.push(newHelpRequest);
        userDataFromDB.save((saveErr, newUser) => {
          if (err) {
            console.error(saveErr);
            return;
          }
          console.log(`${newUser} help requests has been updated.`);
        });
        return null;
      });

      // Respond with the helpRequestId (room number), so the client knows what session to join
      respond({ id: helpRequestID });
      socket.broadcast.emit('queueList', helpRequestsQueue);
    });

    socket.on('joinRoom', (message) => {
      console.log('Got into join room!', message);
      User.findOne({ githubID: message.userData.githubID }, (err, userDataFromDB) => {
        if (err) {
          console.error(err);
          return null;
        }
        // Make edits to the current user
        console.log('This is the userData', userDataFromDB);
        userDataFromDB.helperSessions.push(message.helpInfo);
        userDataFromDB.save((saveErr, newUser) => {
          if (err) {
            console.error(saveErr);
            return;
          }
          console.log(`${newUser} helper Session has been updated.`);
        });
        return null;
      });
    });

    // On a join room request from a helper, remove that listing from the queue
    socket.on('removeFromQueue', (roomID) => {
      helpRequestsQueue.splice(
        handler.findIndexOfProperty(helpRequestsQueue, 'id', roomID.roomID),
        1
      );
      socket.broadcast.emit('queueList', helpRequestsQueue);
    });

    // Retreive user history/stats from database
    socket.on('getUserStats', (githubId) => {
      console.log('I got a socket request on getUserStats');
      User.findOne({ githubID: githubId }, (err, data) => {
        if (err) {
          console.error(err);
          return null;
        }
        socket.emit('receiveUserData', data);
        return null;
      });
    });
  });
};
