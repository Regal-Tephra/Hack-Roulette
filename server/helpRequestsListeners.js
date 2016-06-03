const helpRequestsQueue = [];
module.exports = socket => {
  console.log('Initializing HelpRequests listener');
  socket.on('queued', message => {
    console.log('message queued:', message);
    // clients[message] = socket;
    helpRequestsQueue.push(message);
    console.log('queue:', helpRequestsQueue);
    socket.broadcast.emit('queueList', helpRequestsQueue);
  });

  socket.on('initialGetQueueList', () => {
    socket.broadcast.emit('queueList', helpRequestsQueue);
    console.log('Initial Queue', helpRequestsQueue);
  });
};
