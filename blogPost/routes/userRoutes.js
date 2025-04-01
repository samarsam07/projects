const express = require("express");
const userRoutes = express.Router();
const mongoose = require("mongoose");
const upload = require("../config/multer");
const User = require("../models/User");
const {
  getEditProfileform,
  updateUserProfile,
  getUserProfile,
  deleteUserAccount,
} = require("../controllers/userController");
const { ensureAuthenticated } = require("../middleware/auth");

userRoutes.get("/profile", ensureAuthenticated, getUserProfile);
userRoutes.get("/edit", ensureAuthenticated, getEditProfileform);
userRoutes.post("/delete", ensureAuthenticated, deleteUserAccount);
userRoutes.post(
  "/edit",
  ensureAuthenticated,
  upload.single("profilePicture"),
  updateUserProfile
);

module.exports = userRoutes;
