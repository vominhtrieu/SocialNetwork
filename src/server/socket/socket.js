const User = require("../models/User");
const socketAuth = require("../middlewares/socketAuth");
let connectedUser = {};

module.exports = (io) => {
  io.use(socketAuth);
  io.on("connection", (socket) => {
    if (connectedUser[socket.userId]) {
      connectedUser[socket.userId].push(socket.id);
    } else {
      connectedUser[socket.userId] = [socket.id];
    }

    socket.on("sendFriendRequest", (data) => {
      const connectSocket = connectedUser[data.friendId];
      User.findById(data.friendId, (err, user) => {
        if (user) {
          connectSocket.forEach((socketId) => {
            io.to(socketId).emit("newFriendRequest", {
              newFriendRequest: user.friendRequests.length,
            });
          });
        }
      });
    });

    socket.on("respondFriendRequest", () => {
      const connectSocket = connectedUser[socket.userId];
      User.findById(socket.userId, (err, user) => {
        if (user) {
          connectSocket.forEach((socketId) => {
            io.to(socketId).emit("newFriendRequest", {
              newFriendRequest: user.friendRequests.length,
            });
          });
        }
      });
    });

    socket.on("disconnect", () => {});
  });
};
