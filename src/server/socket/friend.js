const User = require("../models/User");

module.exports = (io, socket) => {
  socket.on("sendFriendRequest", (data) => {
    User.findById(data.friendId, (err, user) => {
      if (!err && user) {
        io.to("u/" + data.friendId).emit("friendRequestUpdate", {
          newFriendRequests: user.friendRequests.length,
        });
        io.to("u/" + data.friendId).emit("newFriendRequest", {
          requestId: user.friendRequests[user.friendRequests.length - 1]
        });
      }
    });
  });

  socket.on("respondFriendRequest", (response) => {
    User.findById(socket.userId, (err, user) => {
      if (!err && user) {
        io.to("u/" + socket.userId).emit("friendRequestUpdate", {
          newFriendRequests: user.friendRequests.length,
        });
        io.to("u/" + socket.userId).emit("respondFriendRequest", response);
      }
    });
  });
};
