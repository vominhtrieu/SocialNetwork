const User = require("../models/User");

exports.getProfile = (req, res) => {
  if (req.body.id === req.body.addId) {
    res.status(400).json("Cannot add yourself");
  }
  User.findById(req.body.id, (err, user) => {
    if (err || !user) res.status(400).json("Unable to find user");
    else
      res.json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
      });
  });
};

exports.getProfileById = (req, res) => {
  User.findById(Number(req.params.id), (err, user) => {
    if (err || !user) res.status(400).json("Unable to find user");
    else
      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        cover: user.cover,
      });
  });
};

exports.auth = (req, res) => {
  res.json("Authenticated");
};
