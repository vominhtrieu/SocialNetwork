const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user: {
    type: Number,
    ref: "User",
  },
  html: String,
  link: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notification", schema);
