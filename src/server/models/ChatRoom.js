const mongoose = require("mongoose");
const IdRecord = require("./IdRecord");

var chatRoomSchema = new mongoose.Schema({
  _id: Number,
  roomName: {
    type: String,
    default: "",
  },
  participants: [{
    type: Number,
    ref: "User",
  }],
  chatHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

chatRoomSchema.pre("save", function (next) {
  if (this.isNew) {
    const document = this;
    IdRecord.findOneAndUpdate(
      { model: "ChatRoom" },
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

module.exports = mongoose.model("ChatRoom", chatRoomSchema);