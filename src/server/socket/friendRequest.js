const connectedSocket = require("./connectedSocket");

exports.sendFriendRequest = (data) => {
  const sockets = connectedSocket.getSocket(data.friendId);

  User.findById(data.friendId, (err, user) => {
    if (user) {
        sockets.forEach((socketId) => {
        io.to(socketId).emit("newFriendRequest", {
          newFriendRequest: user.friendRequests.length,
        });
      });
    }
  });
};
