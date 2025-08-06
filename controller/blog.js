const Blog=require("../model/blog")


async function createBlog(req,res){

        try {
            const {title,content}=req.body
            let availableSlots=2;
            let image=[]
            

            if(req.files && req.files.length > 0){
                if(req.files.length > availableSlots){
                    return res.status(400).json({ message: `You can upload only ${availableSlots} images.` });
                }else{
                    image=req.files.map(file=> `/image/${file.filename}`)
                }
                
            }

            if(!title || !content || image.length === 0){return res.status(400).json({message:"All Field Are required"})} ;

            const newBlog= new Blog({
                title : title,
                content : content,
                image : image

            })

            await newBlog.save()

            if(newBlog){
                return res.status(201).json({message:"Blog create succesfully",Blog:newBlog})
            }
            
        } catch (error) {
              res.status(500).json({message : "Error creating blog post", error : error.message })
        }
}

async function getBlog(req,res){
    try {
        const blogs=await Blog.find()

    res.status(200).json({blogs:blogs})
    } catch (error) {
         
        return res.status(500).json({ 
            message: "Error Fetching blog", 
            error: error.message || error 
        });
    }
}

async function editBlogs(req,res){

    try {
        const {blogId}=req.params;
        const {title,content} =req.body;

        const blog=await Blog.findById(blogId)
        if (!blog) {
                    return res.status(404).json({ message: "Blog Not Found" });
                }

        let existingimage=blog.image || [];
        let maximum=2
        let image =existingimage
        let availableSlots=maximum-image.length;

         if (req.files && req.files.length > 0) {
                    if (req.files.length > availableSlots) {
                        return res.status(400).json({
                            message: `You can upload only ${availableSlots} image(s).`,
                        });
                    }
                    
                    let newimage=req.files.map(file=> `${file.filename}`)
                    image=[...existingimage,...newimage]
            }

            blog.title=title || blog.title;
            blog.content = content || blog.content;
            blog.image = image || blog.image;

            await blog.save()

            return res.status(200).json({
                    message: "Blog editing successful",
                    blog: {
                        id: blog._id,
                        title: blog.title,
                        content: blog.content,
                        image: blog.image,
                    },
                });


        
    } catch (error) {
         return res.status(500).json({
                    message: "Error editing blog",
                    error: error.message,
                });
    }
}


async function deleteBlog(req,res){
    try {
        const {blogId}=req.params;
        await Blog.findByIdAndDelete(blogId)

        return res.status(200).json({ message: "Blog deleted successfully" });
        
    } catch (error) {
         return res.status(500).json({
                    message: "Error Deleteing blog",
                    error: error.message,
                });
    }
}

module.exports={
    createBlog,
    getBlog,
    editBlogs,
    deleteBlog
}