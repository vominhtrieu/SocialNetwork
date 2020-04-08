require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const authMiddleware = require("./middlewares/auth");

const sessionConfig = {
  secret: "86773bbdc9bf02ae7a87adcffa80dd93",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000,
  },
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  sess.cookie.secure = true;
}

//Middlewares
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
//app.use(session(sessionConfig));

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

app.get("/",authMiddleware, (req, res) => {
  res.json("homepage");
})

app.listen(process.env.SERVER_PORT, function () {
  console.log("Server has started on PORT", process.env.SERVER_PORT);
});
