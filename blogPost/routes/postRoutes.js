const express=require('express');
const postRouter=express.Router();
const {getPostForm,createPost,getPosts,getPostById}=require('../controllers/postController');
const upload=require('../config/multer');
const {ensureAuthenticated}=require('../middleware/auth');

postRouter.get("/add",getPostForm);
postRouter.post("/add",ensureAuthenticated,upload.array("images",5),createPost);

postRouter.get("/",getPosts);
postRouter.get("/:id",getPostById)

module.exports=postRouter;