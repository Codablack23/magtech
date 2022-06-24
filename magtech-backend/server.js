const express = require("express")
const {auth,chat,bots,superusers,refferrals,withdrawals} = require("./config")
const sequelize = require("./database")
const app = express()



app.listen(3006,()=>{console.log("server running on port 3000")})
sequelize.sync().then(() => {
  console.log('db has been created')
})
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use("/chat",chat)
app.use("/bots",bots)
app.use("/superusers",superusers)
app.use('/refferals',refferrals)
app.use('/withdrawals',withdrawals)