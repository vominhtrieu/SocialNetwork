const mongoose = require("mongoose");

var friendRequestSchema = new mongoose.Schema({
    user: {
        type: Number,
        required: true,
        ref: "User"
    },
    requestedDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("FriendRequest", friendRequestSchema);