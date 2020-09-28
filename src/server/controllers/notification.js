const ChatRoom = require("../models/ChatRoom");

exports.getUpdate = (req, res) => {
  ChatRoom.find(
    {
      participants: {
        $elemMatch: {
          user: req.body.id,
        },
      },
    },
    (err, rooms) => {
      if (err) res.status(500);
      if (!rooms) rooms = [];
      let notSeenRooms = [];
      rooms.forEach((room) => {
        room.participants.forEach((participant) => {
          if (participant.user === req.body.id) {
            if (participant.messageSeen !== room.messages.length)
              notSeenRooms.push(room._id);
            return;
          }
        });
      });
      res.json({
        newFriendRequests: req.body.user.friendRequests.length,
        notSeenRooms: notSeenRooms,
      });
    }
  );
};
