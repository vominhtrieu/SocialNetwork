const User = require("../models/User");

module.exports = (io, socket) => {
  socket.on("sendFriendRequest", (data) => {
    User.findById(data.friendId, (err, user) => {
      if (!err && user) {
        io.to(data.friendId).emit("newFriendRequest", {
          newFriendRequests: user.friendRequests.length,
        });
      }
    });
  });

  socket.on("respondFriendRequest", () => {
    User.findById(socket.userId, (err, user) => {
      if (!err && user) {
        io.to(socket.userId).emit("newFriendRequest", {
          newFriendRequests: user.friendRequests.length,
        });
      }
    });
  });
};
