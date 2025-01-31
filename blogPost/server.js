const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user");
const app = express();
const port = process.env.PORT || 3000;
// middleware
app.use(express.urlencoded({ extended: true }));
// ejs
app.set("view engine", "ejs");
// routes
// login route
app.get("/auth/login", (req, res) => {
  res.render("login");
});
// Main logic for user login
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // find the user
    const user = await User.findOne({ email });
    const isMatch = await User.findOne({ password });
    // check in db
    if (user && isMatch) {
      res.send("Logged in");
    } else {
      res.send("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
  }
});
// register route
app.get("/auth/register", (req, res) => {
  res.render("register");
});
// main logic for user registration
app.post("/auth/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.send("User already exists");
    } else {
      const newUser = new User({
        username,
        email,
        password,
      });
      await newUser.save();
      res.redirect("/auth/login");
    }
  } catch (error) {
    console.log(error);
  }
});
// start the server
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    console.log("error");
  });
