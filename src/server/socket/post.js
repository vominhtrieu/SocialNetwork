const Post = require('../models/Post');

module.exports = (io, socket) => {
  socket.on('joinPost', ({ postId }) => {
    socket.join('post/' + String(postId));
  });

  socket.on('like', ({ postId }) => {
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
              io.to('post/' + String(post._id)).emit('removeLike', {
                postId: post._id,
                userId: socket.userId,
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
              io.to('post/' + String(post._id)).emit('newLike', {
                postId: post._id,
                userId: socket.userId,
              });
            }
          }
        );
      }
    });
  });

  socket.on('comment', ({ postId, commentId }) => {
    io.to('post/' + String(postId)).emit('newComment', {
      postId: postId,
      commentId: commentId,
    });
  });
};
