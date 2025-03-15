const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const port = process.env.PORT || 3000;
// ejs
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// routes
// login
app.get("/auth/login",(req,res)=>{
  res.render("login");
  // res.json({message:"Login Page"});
});
// user login logic
app.post("/auth/login",async(req,res)=>{
  const {email,password}=req.body;
  try{
    // find user
    const user=await User.findOne({email});
    const isMatch= await User.findOne({password});
    if(user && isMatch){
      // res.redirect("/");
      res.json({message:"Logged in"});
      }else{
        res.json({message:"Invalid credentials"});
      }

  }catch(err){
    console.log(err.message);
  }
}
)
// register
app.get("/auth/register",(req,res)=>{
  res.render("register");
})
// user register logic
app.post("/auth/register", async(req,res)=>{
  const {username,email,password}=req.body;
  try{
    // check if user already exists
    const user=await User.findOne({email});
    if(user){
      res.json({message:"User already exists"});
    }else{
      // create new user
      const newUser= new User({username,email,password});
      await newUser.save();
      res.redirect("/auth/login");
    }
  }catch(err){
    console.log(err.message);
  }
})
// user login logic


// connect to mongodb
const uri="mongodb+srv://samarmohd251:vvA4o498uB4TmmBb@mernproject.ufzao.mongodb.net/blogPost?retryWrites=true&w=majority&appName=mernProject";
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
