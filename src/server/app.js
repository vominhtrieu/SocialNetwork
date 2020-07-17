require("dotenv").config();

const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const cors = require("cors");
const cookieParser = require("cookie-parser");
const databaseController = require("./controllers/database");

//Socket
require("./socket/socket")(io);

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
app.use("/", require("./routes/notification"));
app.use("/", require("./routes/chatRoom"));
app.use("/", require("./routes/post"));
app.use("/", require("./routes/comment"));
app.use("/", require("./routes/search"));
app.use("/", require("./routes/user"));

server.listen(process.env.SERVER_PORT, function () {
  console.log("Server has started on PORT", process.env.SERVER_PORT);
});
