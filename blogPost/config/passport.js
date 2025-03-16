const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = function (passport) {
  // define strategy for email and password
  passport.use(
    new localStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          // find user by email
          const user = await User.findOne({ email: email });
          if (!user) {
            return done(null, false, {
              message: "User not found with that email",
            });
          }
          //   compare password with hashed password
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: "Password incorrect" });
          }
          return done(null, user);
        } catch (err) {
          return done(err); 
        }
      }
    )
  );
    // serializeUser: store user id in session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // deserializeUser: get user id from session and find user by id
    passport.deserializeUser(async function (id, done) {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};


