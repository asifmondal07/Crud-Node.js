const { default: mongoose } = require("mongoose")

async function mongoDbConnect(url){
    return mongoose.connect(url)
    .then(()=>console.log("Mongodb Connect"))
    .catch((err)=>console.log("Mongoose Error ",err))
}

module.exports=mongoDbConnect  