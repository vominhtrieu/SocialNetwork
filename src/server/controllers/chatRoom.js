const ChatRoom = require("../models/ChatRoom");
const User = require("../models/User");

exports.getRoomList = async (req, res) => {
  ChatRoom.aggregate()
    .match({
      participants: {
        $elemMatch: {
          user: req.body.id,
        },
      },
    })
    .sort({
      "recentMessage.0.date": -1,
    })
    .project({
      _id: 1,
      participants: 1,
      recentMessage: {
        $arrayElemAt: [{ $slice: ["$messages", -1] }, 0],
      },
      messageCount: {
        $size: "$messages",
      },
    })
    .exec((err, rooms) => {
      if (err) console.log(err);
      if (!rooms) return res.json([]);
      ChatRoom.populate(
        rooms,
        [
          { path: "recentMessage", model: "Message" },
          {
            path: "participants.user",
          },
        ],
        (err, rooms) => {
          if (err) console.log(err);
          if (err || !rooms) return res.status(500);
          return res.json(rooms);
        }
      );
    });
};

exports.getRoom = (req, res) => {
  ChatRoom.aggregate()
    .match({
      _id: Number(req.params.id),
      participants: {
        $elemMatch: { user: req.body.id },
      },
    })
    .project({
      participants: 1,
      messages: 1,
      messageCount: {
        $size: "$messages",
      },
      recentMessage: {
        $slice: ["$messages", -1],
      },
    })
    .exec((err, room) => {
      if (err) res.status(500);
      if (!room) return res.json(400);
      ChatRoom.populate(
        room,
        [
          {
            path: "recentMessage",
            model: "Message",
          },
          {
            path: "participants.user",
            select: "firstName lastName avatar",
            model: "User",
          },
        ],
        (err, room) => {
          if (err) res.status(500);
          if (!room || room.length !== 1) return res.status(400);
          return res.json(room[0]);
        }
      );
    });
};

exports.getMessages = (req, res) => {
  ChatRoom.findOne({
    _id: req.params.id,
    participants: {
      $elemMatch: { user: req.body.id },
    },
  })
    .populate("messages")
    .exec((err, room) => {
      if (err) return res.status(500);
      if (!room) return res.status(400);
      res.json(room.messages);
    });
};

exports.createNewRoom = async (req, res) => {
  try {
    const userPromiseList = [];
    for (const participant of req.body.participants) {
      if (req.user.friends.find((friend) => friend.user === participant) === -1)
        return res.status(400).json("You're not allowed to chat with strangers");
      userPromiseList.push(User.findById(participant));
    }

    req.body.participants = [req.user._id, ...req.body.participants];

    const newRoom = ChatRoom({
      participants: req.body.participants.map((participant) => ({
        user: participant,
      })),
    });

    await newRoom.save();
    const userList = await Promise.all(userPromiseList);
    await Promise.all(
      userList.map((user) => {
        user.chatRooms.push(newRoom);
        return user.save();
      })
    );

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};
