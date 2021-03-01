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
        cover: user.cover,
        email: user.email,
      });
  });
};

exports.getProfileById = async (req, res) => {
  try {
    const user = await User.findById(Number(req.params.id)).populate("friendRequests", "user").exec();
    const room = await ChatRoom.aggregate()
      .match({
        participants: {
          $size: 2,
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
      .exec();
    let response = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      cover: user.cover,
      friendCount: user.friends.length,
      chatRoom: room ? room._id : null,
    };
    let status = "Nothing";
    let requestUser = await User.populate(req.user, "friendRequests");
    if (user.friends.filter((friend) => friend.user === req.body.id).length === 1) status = "Friend";
    else if (requestUser.friendRequests.filter((request) => request.user === user._id).length === 1) {
      response.request = requestUser.friendRequests.find((request) => request.user === user._id);
      status = "Wait";
    } else if (user.friendRequests.filter((request) => request.user === req.body.id).length > 0) {
      response.request = user.friendRequests.find((request) => request.user === req.body.id);
      status = "Pending";
    }
    response.status = status;

    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.auth = (_req, res) => {
  res.sendStatus(200);
};
