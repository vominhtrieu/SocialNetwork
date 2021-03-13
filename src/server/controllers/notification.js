const ChatRoom = require("../models/ChatRoom");
const User = require("../models/User");

exports.getUpdate = async (req, res) => {
  try {
    const rooms = await ChatRoom.find({
      participants: {
        $elemMatch: {
          user: req.body.id,
        },
      },
    });
    if (!rooms) rooms = [];
    let notSeenRooms = [];
    rooms.forEach((room) => {
      room.participants.forEach((participant) => {
        if (participant.user === req.body.id) {
          if (participant.messageSeen !== room.messages.length) notSeenRooms.push(room._id);
          return;
        }
      });
    });

    await User.populate(req.body.user, { path: "notifications", select: "seen" });
    const notSeenNotificationCount = req.body.user.notifications.filter((noti) => !noti.seen).length;

    res.json({
      newFriendRequests: req.body.user.friendRequests.length,
      notSeenRooms: notSeenRooms,
      notifications: notSeenNotificationCount,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "notifications",
      populate: { path: "user" },
    });
    res.json(user.notifications);
  } catch (err) {
    res.status(500).json(err);
  }
};
