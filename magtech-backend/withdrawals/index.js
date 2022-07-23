const express = require("express")

const withdrawRouter = express.Router()

withdrawRouter.get("/",(req,res)=>{
    res.send("bots")
})
withdrawRouter.get("/investments",(req,res)=>{
    res.send("bots")
})

module.exports = withdrawRouter;