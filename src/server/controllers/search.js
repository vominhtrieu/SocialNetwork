const User = require("../models/User");

exports.searchForUser = (req, res) => {
  const text = req.query.q;

  if (text == "") return res.status(400);
  if (!isNaN(text)) {
    User.findById(text, (err, user) => {
      if (err || !user) res.status(400);
      else
        res.json([
          {
            _id: user._id,
            fullName: user.firstName + " " + user.lastName,
            avatar: user.avatar,
          },
        ]);
    });
  } else {
    User.aggregate([
      {
        $project: {
          fullName: {
            $concat: ["$firstName", " ", "$lastName"],
          },
          avatar: 1,
        },
      },
      {
        $match: {
          fullName: {
            $regex: text,
            $options: "i",
          },
        },
      },
      {
        $limit: 10,
      },
    ]).exec((err, users) => {
      if (err || !users) res.status(400);
      else {
        res.json(
          users.map((user) => ({
            _id: user._id,
            fullName: user.fullName,
            avatar: user.avatar,
          }))
        );
      }
    });
  }
};
