const express = require("express")

const chatRouter = express.Router()

chatRouter.get("/",(req,res)=>{
  res.send("chat")
})

module.exports = chatRouter;