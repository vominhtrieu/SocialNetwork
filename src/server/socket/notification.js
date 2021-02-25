const User = require("../models/User");

module.exports = (io, socket) => {
  socket.on("subscribeToNotifications", () => {
    socket.join("n/" + socket.userId);
  });

  socket.on("unsubscribeToNotifications", () => {
    socket.leave("n/" + socket.userId);
  });
};
