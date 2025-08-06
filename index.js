const express =require("express");
const mongoDbConnect=require("./connection/connect")
const blogRoter=require("./router/blog")

const app=express();
const port=3000;

mongoDbConnect("mongodb://127.0.0.1:27017/crud");

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/blog",blogRoter)

app.listen(port,()=>console.log("Server Started ", port));
