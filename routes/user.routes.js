const express=require('express')
const userRouter=express.Router()
const {UserModel} = require('../models/user.model')
const jwt=require("jsonwebtoken")
userRouter.get('/',(req, res) => {
    res.send('Welcome to Linkdin')
})
userRouter.post('/register',async(req, res) => {
   
    try {
        const user = new UserModel(req.body)
        const{email}=req.body
        const existedUser = await UserModel.find({email})
        if(existedUser.length>0){
            res.send("User already exist, please login.")
        }
        else{
            await user.save()
            res.send("Welcome, user registered successfully")
        }
    } catch (error) {
        console.log(error)
    }
})
userRouter.post("/login",async(req, res) => {
    const token=jwt.sign({course:"backend"},"masai")
    try {
        const {email,password} = req.body
        const user = await UserModel.find({email,password})
        console.log(user)
        if(user.length > 0){
            res.send({"token":token,msg:"Login Successfull"})
        }
        else{
            res.send({msg:"Login Failure, user may not exist or wrong credentials entered."})
            }
    } catch (error) {
        console.log(error)
    }
})
module.exports={userRouter}