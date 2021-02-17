const Post = require("../models/Post");
const User = require("../models/User");
const Image = require("../models/Image");

exports.addNewPost = async (req, res) => {
  try {
    let images = [];

    if (req.files && req.files.length > 0) {
      const fileList = req.files.map(({ filename }) => {
        const img = new Image({
          _id: filename,
          user: Number(req.user.id),
          type: "normal",
          privacy: 0,
        });

        return img.save();
      });

      images = await Promise.all(fileList);
      images = images.map(({ _id }) => _id);
    }

    const post = new Post({
      user: req.user.id,
      textContent: req.body.textContent,
      images: images,
    });

    await post.save();
    req.user.posts.push(post);
    await req.user.save();
    res.json({ postId: post.id });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal error" + err);
  }
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
    if (!post) return res.status(404).json("Cannot find this post");
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

exports.deletePost = async (req, res) => {
  try {
    const result = await User.updateOne({ _id: req.user.id }, { $pull: { posts: +req.params.postId } });
    if (result.nModified === 0) {
      return res.sendStatus(400);
    }
    await Post.deleteOne({ _id: +req.params.postId });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
};
