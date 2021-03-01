const mongoose = require("mongoose");
const IdRecord = require("./IdRecord");

var chatRoomSchema = new mongoose.Schema({
  _id: Number,
  type: "String", //Video or Audio
  participants: [
    {
      type: Number,
      ref: "User",
    },
  ],
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: Date,
});

chatRoomSchema.pre("save", function (next) {
  if (this.isNew) {
    const document = this;
    IdRecord.findOneAndUpdate(
      { model: "CallingRoom" },
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

module.exports = mongoose.model("CallingRoom", chatRoomSchema);
