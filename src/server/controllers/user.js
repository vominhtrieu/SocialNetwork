const User = require("../models/User");
const ChatRoom = require("../models/ChatRoom");

exports.getProfile = (req, res) => {
  User.findById(req.body.id, (err, user) => {
    if (err || !user) res.status(400).json("Unable to find user");
    else
      res.json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        email: user.email,
      });
  });
};

exports.getProfileById = (req, res) => {
  User.findById(Number(req.params.id))
    .populate("friendRequests", "user")
    .exec((err, user) => {
      if (err || !user) return res.status(400).json("Unable to find user");
      let friendStatus = "Nothing";
      ChatRoom.aggregate()
        .match({
          participants: {
            $size: 2,
          },
        })
        .match({
          participants: {
            $elemMatch: {
              user: req.body.id,
            },
          },
        })
        .match({
          participants: {
            $elemMatch: {
              user: req.params.id,
            },
          },
        })
        .project({
          _id: 1,
        })
        .exec((err, room) => {
          if (err) return res.status(500);
          if (user.friends.filter((friend) => friend.user === req.body.id).length === 1) friendStatus = "Friend";
          else if (user.friendRequests.filter((request) => request.user === req.body.id).length > 0)
            friendStatus = "Pending";

          res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar: user.avatar,
            cover: user.cover,
            friendStatus,
            chatRoom: room ? room._id : null,
          });
        });
    });
};

exports.auth = (_req, res) => {
  res.sendStatus(200);
};
