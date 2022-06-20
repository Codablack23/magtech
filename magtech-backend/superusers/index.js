const express = require("express")

const authRouter = express.Router()

authRouter.get("/admin/",(req,res)=>{
    res.send("/")
})

authRouter.get("/support/",(req,res)=>{
    res.send("/")
})
module.exports = authRouter;