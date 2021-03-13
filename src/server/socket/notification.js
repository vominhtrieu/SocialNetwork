const User = require("../models/User");
const Notification = require("../models/Notification");

module.exports = (io, socket) => {
  socket.on("subscribeToNotifications", () => {
    socket.join("n/" + socket.userId);
  });

  socket.on("unsubscribeToNotifications", () => {
    socket.leave("n/" + socket.userId);
  });

  socket.on("seenNotification", async ({ notificationId }) => {
    try {
      const user = await User.findOne({ _id: socket.userId, notifications: { $elemMatch: { $eq: notificationId } } });
      if (!user) {
        return socket.emit("error", "Invalid request");
      }
      await Notification.updateOne({ _id: notificationId }, { seen: true });
      socket.to(`u/${socket.userId}`);
    } catch (err) {
      console.log(err);
      socket.emit("error", err);
    }
  });
};
