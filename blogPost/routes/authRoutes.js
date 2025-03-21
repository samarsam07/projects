const express = require("express");
const userRoutes = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const {
  getLogin,
  login,
  getRegister,
  register,
  logout,
} = require("../controllers/authController");

userRoutes.get("/login", getLogin);
// user login logic
userRoutes.post("/login", login);
// register
userRoutes.get("/register", getRegister);
// user register logic
userRoutes.post("/register", register);
// logout
userRoutes.get("/logout",logout);

module.exports = userRoutes;
