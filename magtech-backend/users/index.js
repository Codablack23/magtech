const express = require("express")
const { sign } = require("jsonwebtoken")
const {authenticate} = require("../services/auth")
const {loginHandler,logoutHandler,registerHandler, sendResetPasswordToken} = require("./controllers")

const userRouter = express.Router()
userRouter.use(express.json())

userRouter.get("/",(req,res)=>{
    res.send("auth")
})
userRouter.post("/change-password",authenticate,sendResetPasswordToken)
userRouter.post("/",authenticate,(req,res)=>{res.json({...req.session.user,status:"Authorized"})} )
userRouter.post("/login",loginHandler)
userRouter.post("/logout",authenticate,logoutHandler)
userRouter.post("/signup",registerHandler)

userRouter.get("/forgot-password/",(req,res)=>{
    res.send("/")
})
module.exports = userRouter;