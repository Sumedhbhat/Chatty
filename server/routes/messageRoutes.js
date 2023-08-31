const express = require("express");
const asyncHandler = require("express-async-handler");
const { protect } = require("../middlewear/authMiddlewear");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageController");

const router = express.Router();

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);

module.exports = router;
