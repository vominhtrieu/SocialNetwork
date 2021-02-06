const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

var imageSchema = new mongoose.Schema({
  _id: Number,
  user: {
    type: Number,
    required: true,
    ref: "User",
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

imageSchema.pre("deleteOne", function (next) {
  this.model.findById(this._conditions._id, (err, image) => {
    if (err) {
      next(err);
    } else {
      fs.unlink(path.join(__dirname, "../images/", image.path), (err) => {
        next(err);
      });
    }
  });
});

module.exports = mongoose.model("Image", imageSchema);
