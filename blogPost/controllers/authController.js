const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const passport = require("passport");

// login in render
exports.getLogin = asyncHandler((req, res) => {
  res.render("login", {
    title: "Login",
    error: "",
    user: req.user,
  });
});

// login logic
exports.login = asyncHandler(async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("login", {
        title: "Login",
        user: req.user,
        error: info.message,
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});
// register render
exports.getRegister = asyncHandler((req, res) => {
  res.render("register", {
    title: "Register",
    error: "",
    user: req.user,
  });
});
// register logic
exports.register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.render("register", {
        title: "Register",
        user: req.user,
        error: "Email already exists",
      });
    }
    //    hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.redirect("/auth/login");
  } catch (err) {
    res.render("register", {
      title: "Register",
      user: req.user,
      error: err.message,
    });
  }
});
exports.logout = asyncHandler((req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/auth/login");
  });
});
