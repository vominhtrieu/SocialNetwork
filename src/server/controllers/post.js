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

exports.getPost = (req, res) => {
    User.findById(req.params.id).populate({
        path: "posts",
        model: "Post",
        populate: {
            path: "user",
            model: "User"
        }
    }).exec((err, user) => {
        if(err || !user)
            return res.status(400).json("Unable to get posts");
        const data = user.posts.map((post) => {
            return {
                user: {
                    Id: post.user._id,
                    firstName: post.user.firstName,
                    lastName: post.user.lastName,
                    avatar: post.user.avatar
                },
                date: post.date,
                textContent: post.textContent,
                images: post.images
            }
        })
        res.json(data);
    });
}