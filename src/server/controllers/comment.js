const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.postComment = async (req, res) => {
  try {
    if (req.body.textContent === "" && !req.body.images) return res.status(400).json("Post must have content");
    const comment = new Comment({
      user: req.body.id,
      textContent: req.body.textContent,
      images: req.body.images,
    });

    await comment.save();
    await Post.updateOne(
      {
        _id: req.body.postId,
      },
      {
        $push: {
          comments: comment,
        },
      }
    );
    res.json({ commentId: comment._id });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal error");
  }
};

exports.getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate("user", "_id firstName lastName avatar").exec();
    if (!comment) res.status(404).json("Unable to find this comment");
    res.json(comment);
  } catch (err) {
    if (err) res.status(500).json("Internal Error");
  }
};

exports.getCommentsInPost = (req, res) => {
  Post.findById(req.params.postId, (err, post) => {
    if (err || !post) {
      res.sendStatus(400);
    } else {
      res.json(post.comments);
    }
  });
};
