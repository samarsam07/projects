const express = require("express");
const commentRouter = express.Router();
const {deleteComment ,updateComment,addComment,getCommentForm } = require("../controllers/commentController");
const {ensureAuthenticated} = require("../middleware/auth")


commentRouter.post("/posts/:id/comments", ensureAuthenticated, addComment);
// edit comment
commentRouter.get("/comments/:id/edit", getCommentForm);
// update comment
commentRouter.put("/comments/:id", ensureAuthenticated, updateComment);
// delete comment
commentRouter.delete("/comments/:id", ensureAuthenticated, deleteComment);
module.exports = commentRouter;