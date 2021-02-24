require("dotenv").config();

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.ORIGIN,
    credentials: true,
  },
});
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const databaseController = require("./controllers/database");
const initial = require("./initial");

//Socket
require("./socket/socket")(io);

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
}

databaseController.connectToDatabase();
initial();

//Middlewares
app.use(cors({ credentials: true, origin: process.env.ORIGIN }));
app.use(express.json());
app.use(cookieParser());

//API Routes
app.use("/api/", require("./routes/auth"));
app.use("/api/", require("./routes/friend"));
app.use("/api/", require("./routes/image"));
app.use("/api/", require("./routes/notification"));
app.use("/api/", require("./routes/chatRoom"));
app.use("/api/", require("./routes/post"));
app.use("/api/", require("./routes/comment"));
app.use("/api/", require("./routes/search"));
app.use("/api/", require("./routes/user"));

//Static Route
app.use("/", express.static(path.join(__dirname, process.env.CLIENT_BUILD_DIRECTORY)));

//Serve all other routes as index.html
app.get("*", function (_req, res) {
  res.sendFile("index.html", {
    root: path.join(__dirname, process.env.CLIENT_BUILD_DIRECTORY),
  });
});

server.listen(process.env.PORT || 4000, function () {
  console.log("Server has started on PORT " + process.env.PORT);
});
