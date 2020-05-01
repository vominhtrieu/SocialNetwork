require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const databaseController = require("./controllers/database");

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
}

databaseController.connectToDatabase();

//Middlewares
app.use(cors({ credentials: true, origin: process.env.ORIGIN }));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/friend"));
app.use("/", require("./routes/image"));
app.use("/", require("./routes/user"));

app.listen(process.env.SERVER_PORT, function () {
  console.log("Server has started on PORT", process.env.SERVER_PORT);
});
