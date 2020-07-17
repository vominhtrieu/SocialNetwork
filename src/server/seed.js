require("dotenv").config();
const databaseController = require("./controllers/database");
const mongoose = require("mongoose");
const IdRecord = require("./models/IdRecord");
databaseController.connectToDatabase();

const startingNumber = 1000000000;

const startingRecords = [
    {
        model: "User",
        recentId: startingNumber
    },
    {
        model: "Image",
        recentId: startingNumber
    },
    {
        model: "ChatRoom",
        recentId: startingNumber
    },
    {
        model: "Post",
        recentId: startingNumber
    },
]

for (record of startingRecords) {
    const idRecord = new IdRecord(record);
    idRecord.save();
}