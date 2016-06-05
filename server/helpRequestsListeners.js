'use strict';
const handler = require('./request-handler');

const helpRequestsQueue = [];
let helpRequestID = 0;

module.exports = io => {
  io.of('/help-requests').on('connection', socket => {
    console.log(`Connected to: ${socket.id}`);

    // Dealing with help request queue PSEUDOCODE
    // Step 1: Listen for queue requests and save data down
    // Step 2: Broadcast queueList out to all people and listen for response
    // Step 3: When receive response, then emit to both Client 1 and Client 2 details of chat

    // TODOS:
    // Get Github ID information
    // Need to generate room name
    // Need to remove from queue the room that has been clicked

    // Potential Problem Areas
    // Will we have an issue with emitting to the wrong places?

    socket.on('getCurrentQueueList', () => {
      socket.emit('queueList', helpRequestsQueue);
    });
    socket.on('queued', (message, respondToClient1) => {
      console.log('message queued:', message);
      // clients[message] = socket;
      helpRequestsQueue.push({
        id: helpRequestID++,
        text: message.requestText,
        client1sessionID: message.client1sessionID,
      });
      console.log('queue:', helpRequestsQueue);
      // Respond with data;
      const dataToReturn = {
        roomName: 'my_room',
        client1ID: message.client1sessionID,
        // TODO: Add client2 id
        client2ID: 'DUMMYDATA',
        requestText: message.requestText,
      };

      // Should be an  asynchronous thing
      socket.broadcast.emit('queueList', helpRequestsQueue);

      socket.on('joinRoom', (data, fn) => {
        dataToReturn.roomName = data.client2sessionID + dataToReturn.client1sessionID;
        dataToReturn.client2sessionID = data.client2sessionID;
        respondToClient1(dataToReturn);
        fn(dataToReturn);
        // Remove from queue this specific room
        helpRequestsQueue.splice(
          handler.findIndexOfProperty(helpRequestsQueue, 'roomName', dataToReturn.roomName), 1
        );
      });
    });
  });
};


