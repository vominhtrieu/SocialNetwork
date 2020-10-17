const Post = require("../models/Post");
const User = require("../models/User");

exports.addNewPost = (req, res) => {
  const post = new Post({
    user: req.body.id,
    textContent: req.body.post.textContent,
  });
  post
    .save()
    .then(() => {
      req.body.user.posts.push(post);
      req.body.user
        .save()
        .then(() => res.json("Added your post"))
        .catch((err) => {
          res.status(500).json("Internal error" + err);
        });
    })
    .catch((err) => {
      res.status(500).json("Internal error" + err);
    });
};

exports.getUserPost = (req, res) => {
  User.findById(req.params.id).exec((err, user) => {
    if (err) return res.status(500).json("Unable to find this user");
    res.json(user.posts.reverse());
  });
};

exports.getPost = (req, res) => {
  Post.findById(Number(req.params.id))
    .populate("user")
    .exec((err, post) => {
      if (err) return res.status(500).json("Unable to find this post");
      res.json({
        postId: post._id,
        user: {
          Id: post.user._id,
          firstName: post.user.firstName,
          lastName: post.user.lastName,
          avatar: post.user.avatar,
        },
        date: post.date,
        textContent: post.textContent,
        images: post.images,
        liked: post.likes.indexOf(req.body.id) !== -1,
        likeCount: post.likes.length,
        comments: post.comments
      });
    });
};

exports.getFeed = (req, res) => {
  const friendIds = req.body.user.friends.map((friend) => {
    return friend.user;
  });

  Post.find({
    user: {
      $in: friendIds,
    },
  })
    .sort({ date: -1 })
    .exec((err, posts) => {
      if (err) return res.status(500).json("Internal error");
      const data = posts.map((post) => post._id);
      res.json(data);
    });
};
