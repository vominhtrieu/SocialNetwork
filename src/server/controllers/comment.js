const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.postComment = (req, res) => {
    console.log(req.body);
  if (req.body.textContent === "" && req.body.images.length() == 0)
    return res.status(400).json("Post doesn't have any content");
  const comment = new Comment({
    user: req.body.id,
    textContent: req.body.textContent,
    images: req.body.images,
  });
  comment
    .save()
    .then(() => {
      Post.updateOne(
        {
          _id: req.body.postId,
        },
        {
          $push: {
            comments: comment,
          },
        },
        (err) => {
          if (err) return res.status(500).json("Internal Error" + err);
          res.sendStatus(200);
        }
      );
    })
    .catch((err) => res.status(500).json("Internal error: " + err));
};

exports.getComment = (req, res) => {
  Comment.findById(req.params.id)
    .populate("user")
    .exec((err, comment) => {
      if (err) return res.status(400).json("Unable to find this comment");
      res.json(comment);
    });
};
