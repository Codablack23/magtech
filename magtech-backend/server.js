const express = require("express")
const session = require("express-session")
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const cors = require("cors")
const dotenv = require("dotenv").config()
const {users,chat,bots,superusers,withdrawals} = require("./config")
const {sequelize,sequelize_session}= require("./database")

const oneMonth = 1000 * 60 * 60 * 24 * 30
const app = express()

sequelize.sync().then(() => {
  console.log('db has been created')
}).catch(err=>console.log(err))
sequelize_session.sync().then(()=>{
  console.log("session store have been created")
}).catch(err=>console.log(err))

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(cors({
   credentials:true,
   origin:process.env.ENV == "dev"?"http://localhost:3005":process.env.FRONT_END
}))
app.use(session({
  secret:process.env.SESSION_SECRET,
  store: new SequelizeStore({db:sequelize_session}),
  saveUninitialized:false,
  resave:false,
  cookie:{
    httpOnly:true,
    secure:false,
    maxAge:oneMonth,
    sameSite:false,
  
}
}))

app.use("/chat",chat)
app.use("/bots",bots)
app.use("/users",users)
app.use("/superusers",superusers)
app.use('/withdrawals',withdrawals)

app.listen(process.env.PORT || 5000,()=>{
    console.log(`server running on port ${process.env.PORT || 5000}`)
})

app.get("/",(req,res)=>{
   res.json({
    status:200,
    message:"Welcome to magtech api"
   })
})