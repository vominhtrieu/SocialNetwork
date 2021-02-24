const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  user: {
    type: Number,
    required: true,
    ref: 'User',
  },
  textContent: {
    type: String,
    required: true,
  },
  image: [String],
  date: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: Number,
      ref: 'User',
    },
  ],
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

module.exports = mongoose.model('Comment', commentSchema);
