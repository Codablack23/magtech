const express = require("express")
const {auth,chat,bots,superusers,refferrals,withdrawals} = require("./config")
const app = express()

app.listen(3006)

app.get("/",(req,res)=>{
  res.send("Hello World")
})

app.use('/users',auth)
app.use("/chat",chat)
app.use("/bots",bots)
app.use("/superusers",payments)
app.use('/refferals',refferrals)
app.use('/withdrawals',withdrawals)