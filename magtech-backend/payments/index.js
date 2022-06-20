const express = require("express")

const paymentRouter = express.Router()

paymentRouter.get("/",(req,res)=>{
   res.send("Payments")
})
paymentRouter.get("/pay",(req,res)=>{
   res.send("pay")
})

module.exports = paymentRouter;