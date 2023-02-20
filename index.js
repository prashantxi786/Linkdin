const express=require('express')
require('dotenv').config()
const {userRouter}=require('./routes/user.routes')
const {postRouter}=require('./routes/post.routes')
const {conn}=require("./config/db")
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.get("/",(req, res) => {
    res.send("WELCOME TO LINKDIN")
})
app.use("/users",userRouter)
app.use("/posts",postRouter)
app.listen(process.env.port,async()=>{
    try {
        await conn
        console.log(`listening on ${process.env.baseUrl}`)
    } catch (error) {
        console.log(error)
    }
})