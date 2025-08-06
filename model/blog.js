const mongoose=require("mongoose")

const blogSChema = new mongoose.Schema({

    title:{
        type: String,
        require: true
    },
    content:{
        type: String,
        require: true
    },
    image:[String],
    createdt:{
        type: Date,
        default:Date.now
    }

},{timestamps:true})

const Blog=mongoose.model("Blog",blogSChema)

module.exports=Blog