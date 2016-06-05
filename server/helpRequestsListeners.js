'use strict';
// const handler = require('./request-handler');

const helpRequestsQueue = [];
let helpRequestID = 0;


    // Dealing with help request queue PSEUDOCODE
    // Step 1: Listen for queue requests and save data down
    // Step 2: Broadcast queueList out to all people and listen for response
    // Step 3: When receive response, then emit to both Client 1 and Client 2 details of chat

    // TODOS:
    // Get Github ID information
    // Need to generate room name
    // Need to remove from queue the room that has been clicked

module.exports = io => {
  io.of('/help-requests').on('connection', socket => {
    socket.on('getCurrentQueueList', () => {
      // Sends current queueList back to client
      socket.emit('queueList', helpRequestsQueue);
    });
    socket.on('addRequest', (message, respond) => {
      // Add message to queue and respond with id so client can join room
      helpRequestsQueue.push({
        id: ++helpRequestID,
        text: message.requestText,
        client1sessionID: message.client1sessionID,
      });
      respond({ id: helpRequestID });
    });
  });
};
