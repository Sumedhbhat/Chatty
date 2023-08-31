const bodyParser = require("body-parser");
const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const path = require("path");
const { notFound, errorHandler } = require("./middlewear/errorMiddlewear");

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
connectDB();

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/messages", messageRoutes);

const __dirname0 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname0, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname0, "..", "client", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log("Server started on Port", PORT);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("join Chat", (room) => {
    socket.join(room);
    console.log("user joined room " + room);
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    if (!chat.users) {
      console.log("chat.users not defined");
      return;
    }
    chat.users.forEach((user) => {
      console.log(user._id);
      if (user._id === newMessageReceived.sender._id) {
        return;
      }
      socket.in(user._id).emit("Message received", newMessageReceived);
    });
  });
  socket.off("setup", () => {
    console.log("user disconnected");
    socket.leave(userData._id);
  });
});