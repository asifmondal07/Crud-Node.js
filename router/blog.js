const express =require("express")

const upload = require("../middilware/multer")


const {createBlog,getBlog,editBlogs,deleteBlog}=require("../controller/blog")


const router=express.Router()

router.post("/create",upload,createBlog)
router.get("/",getBlog)
router.put("/:blogId",upload,editBlogs)
router.delete("/:blogId",deleteBlog)


module.exports=router
