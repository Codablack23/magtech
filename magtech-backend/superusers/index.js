const express = require("express")
const {authenticateAdmin} = require("../services/auth")
const {getBots,getUsers,getInvestments,getPayments,addAdmin,loginAdmin, UpdateAdmin, createAdmin} = require("./controllers")

const authRouter = express.Router()


authRouter.post("/create-admin",createAdmin)
authRouter.post("/",authenticateAdmin,(req,res)=>{
    console.log(req.session.admin)
    res.json({...req.session.admin,status:"Authorized"})
})
authRouter.post("/admin",loginAdmin)
authRouter.post("/admin/investments",authenticateAdmin,getInvestments)
authRouter.post("/admin/bots",authenticateAdmin,getBots)
authRouter.post("/admin/payments",authenticateAdmin,getPayments)
authRouter.post("/admin/users",authenticateAdmin,getUsers)
authRouter.post("/admin/add",addAdmin)

authRouter.get("/support/",(req,res)=>{
    res.send("/")
})
module.exports = authRouter;