'use strict';
const _ = require('underscore');
const clients = {};

module.exports = io => {
  io.of('/screenshare').on('connection', socket => {
    let room;
    console.log(`Connected to: ${socket.id}`);
    socket.on('join-room', roomName => {
      console.log('joining room', roomName);
      if (room) {
        socket.leave(room);
      }
      room = roomName;
      socket.join(room);
    });
    socket.on('change', text => {
      console.log(room, text);
      socket.broadcast.to(room).emit('text change', text);
    });
    socket.on('connectUser', userId => {
      console.log(userId);
      clients[userId] = socket;
      console.log('  Clients:', Object.keys(clients));
    });
    socket.on('disconnect', () => {
      _.each(clients, (clientSocket, userId) => {
        if (clientSocket === socket) {
          delete clients[userId];
          console.log('Disconnected:', userId);
        }
      });
      console.log('  Clients:', Object.keys(clients));
    });
  });
};
