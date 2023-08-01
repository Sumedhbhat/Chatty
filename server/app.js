const bodyParser = require("body-parser");
const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
connectDB();

app.get("/", (req, res) => {
  res.json({ msg: "Hello world" });
});

app.use("/api/user");

app.listen(PORT, () => {
  console.log("Server started on Port", PORT);
});
