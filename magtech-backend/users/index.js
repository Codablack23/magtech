const express = require("express")

const authRouter = express.Router()

authRouter.get("/",(req,res)=>{
    res.send("auth")
})
authRouter.post("/login",(req,res)=>{
    res.send("/")
})
authRouter.get("/logout",(req,res)=>{
    res.send("/")
})
authRouter.get("/signup",(req,res)=>{
    res.send("/")
})
authRouter.get("/forgot-password/",(req,res)=>{
    res.send("/")
})
module.exports = authRouter;