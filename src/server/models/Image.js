const mongoose = require('mongoose');
const IdRecord = require('./IdRecord');
const fs = require('fs');
const path = require('path');

var imageSchema = new mongoose.Schema({
  _id: Number,
  user: {
    type: Number,
    required: true,
    ref: 'User',
  },
  path: String,
  type: String,
  date: {
    type: Date,
    default: Date.now,
  },
  privacy: {
    type: Number,
    require: true,
    default: 0, //0: public, 1: friend only, 2: only me
  },
});

imageSchema.pre('save', function (next) {
  if (this.isNew) {
    const document = this;
    IdRecord.findOneAndUpdate(
      { model: 'Image' },
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

imageSchema.pre('deleteOne', function (next) {
  this.model.findById(this._conditions._id, (err, image) => {
    if (err) {
      next(err);
    } else {
      fs.unlink(path.join(__dirname, '../images/', image.path), (err) => {
        next(err);
      });
    }
  });
});

module.exports = mongoose.model('Image', imageSchema);
