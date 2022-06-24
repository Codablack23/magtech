const express = require("express")

const botsRouter = express.Router()

botsRouter.get("/",(req,res)=>{
    res.send("bots")
})
botsRouter.get("/investments",(req,res)=>{
    res.send("bots")
})
module.exports = botsRouter;