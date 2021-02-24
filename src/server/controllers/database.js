const mongoose = require("mongoose");

exports.connectToDatabase = () => {
  mongoose
    .connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.log("Error when connect to database", err));
};
