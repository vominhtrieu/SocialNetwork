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
        .then(() => res.json({ postId: post.id }))
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

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(Number(req.params.id)).populate("user", "_id firstName lastName avatar").exec();
    if (!post) res.status(404).json("Cannot find this post");
    res.json({
      postId: post._id,
      user: post.user,
      date: post.date,
      textContent: post.textContent,
      images: post.images,
      liked: post.likes.indexOf(req.body.id) !== -1,
      likeCount: post.likes.length,
      commentCount: post.comments.length,
      innerPost: post.innerPost,
    });
  } catch (err) {
    res.status(501).json(err);
  }
};

exports.getFeed = (req, res) => {
  const userList = req.body.user.friends.map((friend) => {
    return friend.user;
  });

  userList.push(req.body.id);

  Post.find({
    user: {
      $in: userList,
    },
  })
    .sort({ date: -1 })
    .exec((err, posts) => {
      if (err) return res.status(500).json("Internal error");
      const data = posts.map((post) => post._id);
      res.json(data);
    });
};

exports.sharePost = async (req, res) => {
  try {
    const post = new Post({
      user: req.body.id,
      textContent: req.body.post.textContent,
      innerPost: req.params.postId,
    });
    await post.save();
    req.body.user.posts.push(post);
    await req.body.user.save();
    res.json({ postId: post.id });
  } catch (e) {
    res.status(500).json("Internal error" + e);
  }
};
