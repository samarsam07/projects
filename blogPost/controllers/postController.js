const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");
const File = require("../models/File");

exports.getPostForm = asyncHandler((req, res) => {
  res.render("newPost", {
    title: "Post Form",
    error: "",
    success: "",
    user: req.user,
  });
});

exports.createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  // validate the form
  if (!req.files || req.files.length === 0) {
    return res.render("newPost", {
      title: "Post Form",
      error: "Please upload an image",
      user: req.user,
    });
  }
  const images = await Promise.all(
    req.files.map(async (file) => {
      // save the image into file model
      const newFile = new File({
        url: file.path,
        public_id: file.filename,
        uploaded_by: req.user._id,
      });
      await newFile.save();
      console.log(newFile);
      return {
        url: file.path,
        public_id: file.filename,
      };
    })
  );
  // create post
  const newPost = new Post({
    title,
    content,
    author: req.user._id,
    images,
  });
  await newPost.save();
  res.render("newPost", {
    title: "Post Form",
    user: req.user,
    error: "",
    success: "Post created successfully",
  });
});

// get all posts
exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("author", "name")
  res.render("posts", {
    title: "Posts",
    posts,
    user: req.user,
    success:"",
    error:"",
  });
});
exports.getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "name");
  res.render("posts", {
    title: "PostDetails",
    post,
    user: req.user,
    success:"",
    error:"",
  });
});