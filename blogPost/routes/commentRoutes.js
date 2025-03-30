const express = require("express");
const commentRouter = express.Router();
const { addComment } = require("../controllers/commentController");
const {ensureAuthenticated} = require("../middleware/auth")


commentRouter.post("/posts/:id/comment", ensureAuthenticated, addComment);

module.exports = commentRouter;