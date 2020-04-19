const mongoose = require("mongoose");

var friendRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    requestedDate: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = mongoose.model("FriendRequest", friendRequestSchema);