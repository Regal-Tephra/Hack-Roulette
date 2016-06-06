'use strict';
const handler = require('./request-handler');
const User = require('./data/db/models/user');

const helpRequestsQueue = [];
let helpRequestID = Math.floor(Math.random() * 10000);
// start at a high number to allow testing with same api on multiple computers;


    // Dealing with help request queue PSEUDOCODE
    // Step 1: Listen for queue requests and save data down
    // Step 2: Broadcast queueList out to all people and listen for response
    // Step 3: When receive response, then emit to both Client 1 and Client 2 details of chat

    // TODOS:
    // 2. Get queue data to persist
    // Need a way to close the room when player 1 leaves the chat

module.exports = io => {
  io.of('/help-requests').on('connection', socket => {
    socket.on('getCurrentQueueList', () => {
      // Sends current queueList back to client
      socket.emit('queueList', helpRequestsQueue);
    });
    socket.on('addRequest', (message, respond) => {
      // Add message to queue and respond with id so client can join room
      console.log('This is the message received', message);
      // Add the help request to the queue
      const newHelpRequest = {
        id: ++helpRequestID,
        text: message.requestText,
        languageChosen: message.languageChosen,
        client1sessionID: message.client1sessionID,
        userData: message.userData,
      };

      helpRequestsQueue.push(newHelpRequest);

      // Add the help request to the respective user
      User.findOne({ githubID: message.userData.githubID }, (err, userDataFromDB) => {
        if (err) {
          console.error(err);
          return null;
        }
        // Make edits to the current user
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

      console.log('help requests', helpRequestsQueue);
      respond({ id: helpRequestID });
      socket.broadcast.emit('queueList', helpRequestsQueue);
    });

    socket.on('joinRoom', (message) => {
      console.log('Got into join room!', message);
      User.findOne({ githubID: message.userInfo.githubID }, (err, userDataFromDB) => {
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

    socket.on('getUserStats', (githubId) => {
      console.log('I got a socket request on getUserStats');
      User.findOne({ githubID: githubId }, (err, data) => {
        if (err) {
          console.error(err);
          return null;
        }
        console.log(data);
        socket.emit('receiveUserData', data);
      });
    });


  });
};
