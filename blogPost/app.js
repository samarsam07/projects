const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
// ejs
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// routes
app.get("/auth/login",(req,res)=>{
  res.render("login");
  // res.json({message:"Login Page"});
});
// register
app.get("/auth/register",(req,res)=>{
  res.render("register");
})


// connect to mongodb
const uri="mongodb+srv://samarmohd251:vvA4o498uB4TmmBb@mernproject.ufzao.mongodb.net/?retryWrites=true&w=majority&appName=mernProject";
mongoose
  .connect(uri,{
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
