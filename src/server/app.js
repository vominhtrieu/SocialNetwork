require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const authMiddleware = require("./middlewares/auth");

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  sess.cookie.secure = true;
}

//Middlewares
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

//Connect to database
mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Error when connect to database", err));

//Routes
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/friend"));

app.get("/",authMiddleware, (req, res) => {
  res.json("homepage");
})

app.listen(process.env.SERVER_PORT, function () {
  console.log("Server has started on PORT", process.env.SERVER_PORT);
});
