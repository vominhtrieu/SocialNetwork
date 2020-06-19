let connectedUser = {};

exports.addSocket = (userId, socketId) => {
  if (connectedUser[socket.userId]) {
    connectedUser[socket.userId].push(socket.id);
  } else {
    connectedUser[socket.userId] = [socket.id];
  }
};

exports.getSocket = (userId) => {
  return connectedUser[socket.userId];
};
