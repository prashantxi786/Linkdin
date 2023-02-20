const express=require('express')
const jwt=require('jsonwebtoken')
const postRouter=express.Router()
const {PostModel} = require("../models/post.model")
postRouter.get('/',async(req, res) => {
    const token=req.headers.authorization
    try {
        jwt.verify(token,"masai",async(err,decoded)=>{
            if (decoded) {
                const posts=await PostModel.find()
                res.send(posts)
            }
            else{
                res.send("Login to First")
            }
        })
        
    } catch (error) {
        console.log(error)
    }  
})
postRouter.post("/new",async(req, res) => {
    const token=req.headers.authorization
    try {
        jwt.verify(token,"masai",async(err,decoded)=>{
            if (decoded) {
                const post=new PostModel(req.body)
                await post.save()
                res.send('Successfully posted')
            }
            else{
                res.send("Login to post anything")
            }
        })
        
    } catch (error) {
        console.log(error)
    }
})
postRouter.patch("/update/:id",async(req,res) => {
    const token=req.headers.authorization
    try {
        jwt.verify(token,"masai",async(err,decoded)=>{
            if (decoded) {
                await PostModel.findByIdAndUpdate({_id: req.params.id},req.body)
                res.send("Post has been updated successfully")
            }
            else{
                res.send("Login to update anything")
            }
        })
        
    } catch (error) {
        console.log(error)
    }
   
})
postRouter.delete("/delete/:id",async(req,res) => {
    const token=req.headers.authorization
    try {
        jwt.verify(token,"masai",async(err,decoded)=>{
            if (decoded) {
                await PostModel.findByIdAndDelete({_id: req.params.id})
                res.send("Post has been deleted successfully")
            }
            else{
                res.send("Login to delete anything")
            }
        })
        
    } catch (error) {
        console.log(error)
    }
   
})
module.exports={postRouter}