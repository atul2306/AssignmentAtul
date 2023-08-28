const express = require("express")
const router= express.Router();
const blogcontroller = require("../Controllers/blog")
const multer = require("../Config/multer")
router.post("/addBlog", multer.single("blogImage") ,blogcontroller.blog_add_controller)       
router.post("/editBlogTitle",blogcontroller.Updateblogtitle)       
router.post("/editBlogDescription",blogcontroller.UpdateblogDescription)       
router.post("/AddLike",blogcontroller.likeAndUnlikeBlog)       
router.post("/AddComment",blogcontroller.commentsOnBlog)       
router.post("/deleteBlog",blogcontroller.DeleteBlog)       

module.exports=router;