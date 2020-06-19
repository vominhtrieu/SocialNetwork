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
      $elemMatch: { $eq: req.body.id },
    },
  })
    .populate("participants")
    .populate("chatHistory")
    .exec((err, room) => {
      if (err)
        res.status(500).json("Unable to handle this request. Error: " + err);
      else if (!room)
        res.status(400).json("You are not authorized to view this room");
      else {
        let data = {
          roomId: room._id,
        };
        if (room.chatHistory.length > 0)
          data.recentMessage = room.chatHistory[room.chatHistory.length - 1].textContent;
        else data.recentMessage = "";

        data.participants = room.participants.map((participant) => ({
          id: participant._id,
          firstName: participant.firstName,
          lastName: participant.lastName,
          avatar: participant.avatar,
        }));

        res.json(data);
      }
    });
};

exports.getMessages = (req, res) => {
  ChatRoom.findOne({
    _id: req.params.id,
    participants: {
      $elemMatch: { $eq: req.body.id },
    },
  })
    .populate({
      path: "chatHistory",
      model: "Message",
      populate: {
        path: "sender",
        mode: "User"
      }
    })
    .exec((err, room) => {
      if (err || !room)
        return res.status(400).json("Unable to make this request");
      const data = room.chatHistory.map((message) => {
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
