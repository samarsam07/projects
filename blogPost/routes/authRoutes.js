const express = require("express");
const authRoutes = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const {
  getLogin,
  login,
  getRegister,
  register,
  logout,
} = require("../controllers/authController");

authRoutes.get("/login", getLogin);
// user login logic
authRoutes.post("/login", login);
// register
authRoutes.get("/register", getRegister);
// user register logic
authRoutes.post("/register", register);
// logout
authRoutes.get("/logout",logout);

module.exports = authRoutes;
