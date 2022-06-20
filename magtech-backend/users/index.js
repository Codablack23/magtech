const express = require("express")

const authRouter = express.Router()

authRouter.get("/",(req,res)=>{
    res.send("auth")
})
authRouter.get("/login",(req,res)=>{
    res.send("/")
})
authRouter.get("/signup",(req,res)=>{
    res.send("/")
})
authRouter.get("/admin/",(req,res)=>{
    res.send("/")
})
authRouter.get("/forgot-password/",(req,res)=>{
    res.send("/")
})
authRouter.get("/support/",(req,res)=>{
    res.send("/")
})
module.exports = authRouter;