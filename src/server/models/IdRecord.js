const mongoose = require('mongoose');

var idRecordShcema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  recentId: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model('IdRecord', idRecordShcema);
