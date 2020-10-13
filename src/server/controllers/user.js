const User = require("../models/User");

exports.getProfile = (req, res) => {
  User.findById(req.body.id, (err, user) => {
    if (err || !user) res.status(400).json("Unable to find user");
    else
      res.json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        email: user.email
      });
  });
};

exports.getProfileById = (req, res) => {
  User.findById(Number(req.params.id))
    .populate("friendRequests", "user")
    .exec((err, user) => {
      if (err || !user) return res.status(400).json("Unable to find user");

      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        cover: user.cover,
        isFriend:
          user.friends.filter((friend) => friend.user === req.body.id)
            .length === 1,
      });
    });
};

exports.auth = (req, res) => {
  res.json("Authenticated");
};

exports.getFeed = (req, res) => {
  
}
