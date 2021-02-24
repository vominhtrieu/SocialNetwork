const Post = require("../models/Post");

module.exports = (io, socket) => {
  socket.on("joinPost", ({ postId }) => {
    socket.join("post/" + String(postId));
  });

  socket.on("like", async ({ postId }) => {
    const post = await Post.findById(postId);
    if (!post) return socket.emit("error", "This post have been deleted");

    try {
      if (post.likes.indexOf(socket.userId) !== -1) {
        const post = await Post.findOneAndUpdate(
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
          }
        );
        if (post) {
          io.to("post/" + String(post._id)).emit("removeLike", {
            postId: post._id,
            userId: socket.userId,
          });
        }
      } else {
        const post = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $push: {
              likes: socket.userId,
            },
          },
          {
            useFindAndModify: false,
            new: true,
          }
        );
        if (post) {
          io.to("post/" + String(post._id)).emit("newLike", {
            postId: post._id,
            userId: socket.userId,
          });
        }
      }
    } catch (err) {
      socket.emit("error", err.message);
    }
  });

  socket.on("comment", ({ postId, commentId }) => {
    io.to("post/" + String(postId)).emit("newComment", {
      postId: postId,
      commentId: commentId,
    });
  });
};
