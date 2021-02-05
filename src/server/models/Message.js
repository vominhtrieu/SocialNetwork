const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  sender: {
    type: Number,
    ref: 'User',
  },
  textContent: String,
  images: [{ type: Number, ref: 'Image' }],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', messageSchema);
