const express=require('express');
const postRouter=express.Router();
const {updatePost,getEditPostForm,getPostForm,createPost,getPosts,getPostById}=require('../controllers/postController');
const upload=require('../config/multer');
const {ensureAuthenticated}=require('../middleware/auth');

postRouter.get("/add",getPostForm);
postRouter.post("/add",ensureAuthenticated,upload.array("images",5),createPost);

postRouter.get("/",getPosts);
postRouter.get("/:id",getPostById)
postRouter.get("/:id/edit",getEditPostForm);
postRouter.put("/:id",ensureAuthenticated,upload.array("images",5),updatePost);

module.exports=postRouter;