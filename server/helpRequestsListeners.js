const helpRequestsQueue = [];
module.exports = socket => {
  console.log('Initializing HelpRequests listener');

  // Dealing with help request queue PSEUDOCODE
  // Step 1: Listen for queue requests and save data down
  // Step 2: Broadcast queueList out to all people and listen for response
  // Step 3: When receive response, then emit to both Client 1 and Client 2 details of chat

  // TODOS:
    // Get Github ID information
    // Need to generate room name

  socket.on('queued', (message, fn) => {
    console.log('message queued:', message);
    // clients[message] = socket;
    helpRequestsQueue.push(message);
    console.log('queue:', helpRequestsQueue);
    // Respond with data;
    const dataToReturn = {
      roomName: 'my_room',
      client1ID: message.client1sessionID,
      // TODO: Add client2 id
      client2ID: 'DUMMYDATA',
      requestText: message.requestText,
    };

    const respondToClient1 = fn;
    // Should be an  asynchronous thing
    socket.broadcast.emit('queueList', helpRequestsQueue);

    socket.on('joinRoom', (data, fn) => {
      dataToReturn.roomName = data.client2sessionID + dataToReturn.client1sessionID;
      dataToReturn.client2sessionID = data.client2sessionID;
      respondToClient1(dataToReturn);
      fn(dataToReturn);
    });
  });

  socket.on('initialGetQueueList', () => {
    socket.broadcast.emit('queueList', helpRequestsQueue);
    console.log('Initial Queue', helpRequestsQueue);
  });
};
