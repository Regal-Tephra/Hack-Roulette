const helpRequestsQueue = [];
module.exports = socket => {
  console.log('Initializing HelpRequests listener');

  // Dealing with help request queue PSEUDOCODE
  // Step 1: Listen for queue requests and save data down
  // Step 2: Broadcast queueList out to all people and listen for response
  // Step 3: When receive response, then emit to both Client 1 and Client 2 details of chat

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

    // Should be an  asynchronous thing

    socket.broadcast.emit('queueList', helpRequestsQueue);
    fn(dataToReturn);
  });

  socket.on('initialGetQueueList', () => {
    socket.broadcast.emit('queueList', helpRequestsQueue);
    console.log('Initial Queue', helpRequestsQueue);
  });
};
