'use strict';

module.exports = io => {
  io.of('/screenshare').on('connection', socket => {
    let room;
    let text = '';
    console.log(`Connected to: ${socket.id}`);

    // When a user joins a room, set the socket to that room
    socket.on('join-room', roomName => {
      console.log('joining room', roomName);
      if (room) {
        socket.leave(room);
      }
      room = roomName;
      socket.join(room);

      // Send current text
      socket.emit('text change', text);
    });

    // When the text changes, boardcast the change
    socket.on('change', newText => {
      text = newText;
      console.log(room, text);
      socket.broadcast.to(room).emit('text change', text);
    });
  });
};
