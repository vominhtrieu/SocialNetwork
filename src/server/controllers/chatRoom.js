const ChatRoom = require("../models/ChatRoom");

exports.getRoomList = async (req, res) => {
  try {
    await req.body.user.populate("chatRooms").execPopulate();
    const data = req.body.user.chatRooms.map((room) => room._id);
    res.json(data);
  } catch (err) {
    res.status(400).json("Unable to handle this request");
  }
};

exports.getRoom = (req, res) => {
  ChatRoom.findOne({
    _id: req.params.id,
    participants: {
      $elemMatch: { user: req.body.id },
    },
  })
    .populate("participants.user")
    .populate("messages")
    .exec((err, room) => {
      if (err)
        res.status(500).json("Error: " + err);
      else if (!room)
        res.status(400).json("You are not authorized to view this room");
      else {
        let data = {
          roomId: room._id,
        };
        if (room.messages.length > 0)
          data.recentMessage = room.messages[room.messages.length - 1].textContent;
        else data.recentMessage = "";

        data.participants = room.participants.map(({user, messageSeen}) => ({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          messageSeen: messageSeen,
        }));
        data.messageCount = room.messages.length;

        res.json(data);
      }
    });
};

exports.getMessages = (req, res) => {
  ChatRoom.findOne({
    _id: req.params.id,
    participants: {
      $elemMatch: { user: req.body.id },
    },
  })
    .populate({
      path: "messages",
      model: "Message",
      populate: {
        path: "sender",
        model: "User"
      }
    })
    .exec((err, room) => {
      if (err || !room)
        return res.status(400).json("Unable to make this request");
      const data = room.messages.map((message) => {
        return {
          senderId: message.sender._id,
          senderAvatar: message.sender.avatar,
          senderFirstName: message.sender.firstName,
          senderLastName: message.sender.lastName,
          textContent: message.textContent,
          images: message.images,
        };
      });

      res.json(data);
    });
};
