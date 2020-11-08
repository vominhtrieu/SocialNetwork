const mongoose = require('mongoose');
const IdRecord = require('./IdRecord');

var postSchema = new mongoose.Schema({
  _id: Number,
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
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  privacy: {
    type: Number,
    require: true,
    default: 0, //0: public, 1: friend only, 2: only me
  },
});

postSchema.pre('save', function (next) {
  if (this.isNew) {
    const document = this;
    IdRecord.findOneAndUpdate(
      { model: 'Post' },
      { $inc: { recentId: 1 } },
      { new: true, useFindAndModify: false },
      (err, data) => {
        if (err) next(err);
        else {
          document._id = data.recentId;
          next();
        }
      }
    );
  } else next();
});

module.exports = mongoose.model('Post', postSchema);
