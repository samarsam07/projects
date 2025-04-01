require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const authRoutes = require("./routes/authRoutes");
const session = require("express-session");
const postRoutes = require("./routes/postRoutes");
const passport = require("passport");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const passportConfig = require("./config/passport");
const commentRoutes = require("./routes/commentRoutes");
const port = process.env.PORT || 3000;

// ejs
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// method override middleware
app.use(methodOverride("_method"));
// session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://samarmohd251:vvA4o498uB4TmmBb@mernproject.ufzao.mongodb.net/blogPost?retryWrites=true&w=majority&appName=mernProject",
    }),
  })
);
// passport
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());
// routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/", commentRoutes);
app.use(errorHandler);
// home
app.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
    error: "",
    user: req.user,
  });
});

// connect to mongodb
const uri =
  "mongodb+srv://samarmohd251:vvA4o498uB4TmmBb@mernproject.ufzao.mongodb.net/blogPost?retryWrites=true&w=majority&appName=mernProject";
mongoose
  .connect(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Not Connected to MongoDB ERROR! ", err);
  });
