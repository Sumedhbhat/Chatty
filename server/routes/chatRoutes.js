const express = require("express");
const { protect } = require("../middlewear/authMiddlewear");
const router = express.Router();
const {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroupChat,
  removeFromGroup,
  addToGroup,
} = require("../controllers/chatController");

router.route("/").get(protect, fetchChat);
router.route("/").post(protect, accessChat);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroupChat);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
