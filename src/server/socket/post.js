const Post = require("../models/Post");

module.exports = (io, socket) => {
  socket.on("joinPost", ({ postId }) => {
    socket.join("post/" + String(postId));
  });

  socket.on("like", ({ postId }) => {
    Post.findById(postId, (err, post) => {
      if (!post) return;
      if (post.likes.indexOf(socket.userId) !== -1) {
        Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              useFindAndModify: false,
              likes: socket.userId,
            },
          },
          {
            useFindAndModify: false,
            new: true,
          },
          (err, post) => {
            if (!err && post) {
              socket.to("post/" + String(post._id)).emit("newLike", {
                likeCount: post.likes.length,
              });
            }
          }
        );
      } else {
        Post.findOneAndUpdate(
          { _id: postId },
          {
            $push: {
              likes: socket.userId,
            },
          },
          {
            useFindAndModify: false,
            new: true,
          },
          (err, post) => {
            if (!err && post) {
              socket.to("post/" + String(post._id)).emit("newLike", {
                likeCount: post.likes.length,
              });
            }
          }
        );
      }
    });
  });
};
