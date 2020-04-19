const mongoose = require("mongoose");

var friendRelationshipSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    since: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("FriendRelationship", friendRelationshipSchema);