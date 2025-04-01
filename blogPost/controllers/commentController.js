const asynchandler = require("express-async-handler");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

exports.addComment = asynchandler(async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  //find the post
  const post = await Post.findById(postId);
  //validation
  if (!post) {
    return res.render("postDetails", {
      title: "Post",
      post,
      user: req.user,
      error: "Post not found",
      success: "",
    });
  }
  if (!content) {
    return res.render("postDetails", {
      title: "Post",
      post,
      user: req.user,
      error: "Comment cannot be empty",
      success: "",
    });
  }
  //save comment
  const comment = new Comment({
    content,
    post: postId,
    author: req.user._id,
  });
  await comment.save();
  //push comment
  post.comments.push(comment._id);
  await post.save();
  console.log(post);
  //redirect
  res.redirect(`/posts/${postId}`);
});
// edit comment
exports.getCommentForm = asynchandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.render("postDetails", {
      title: "Post",
      comment,
      user: req.user,
      error: "Post not found",
      success: "",
    });
  }
  res.render("editComment", {
    title: "Edit Comment",
    comment,
    user: req.user,
    error: "",
    success: "",
  });
});

exports.updateComment = asynchandler(async (req, res) => {
  const { content } = req.body;
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.render("postDetails", {
      title: "Post",
      comment,
      user: req.user,
      error: "Post not found",
      success: "",
    });
  }
  if (comment.author.toString() !== req.user._id.toString()) {
    {
      return res.render("postDetails", {
        title: "Post",
        comment,
        user: req.user,
        error: "You are not authorized to edit this comment",
        success: "",
      });
    }
  }
  comment.content = content || comment.content;
  await comment.save();
  res.redirect(`/posts/${comment.post}`);
});
// delete comment
exports.deleteComment = asynchandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.render("postDetails", {
      title: "Post",
      comment,
      user: req.user,
      error: "Post not found",
      success: "",
    });
  }
  if (comment.author.toString() !== req.user._id.toString()) {
    {
      return res.render("postDetails", {
        title: "Post",
        comment,
        user: req.user,
        error: "You are not authorized to delete this comment",
        success: "",
      });
    }
  }
  await Comment.findByIdAndDelete(req.params.id);

  res.redirect(`/posts/${comment.post}`);
})
