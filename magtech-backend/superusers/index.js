const express = require("express")
const {authenticateAdmin} = require("../services/auth")
const {
getBots,
getUsers,
getInvestments,
getPayments,
addAdmin,
loginAdmin,
updateExchange,
getExchanges,
createAdmin, 
getWithdrawals, 
getAdmins
} = require("./controllers")

const authRouter = express.Router()

authRouter.post("/update-exchange",authenticateAdmin,updateExchange);
authRouter.post("/exchanges",getExchanges)
authRouter.post("/create-admin",createAdmin)
authRouter.post("/",authenticateAdmin,(req,res)=>{
    console.log(req.session.admin)
    res.json({...req.session.admin,status:"Authorized"})
})
authRouter.post("/admin/withdrawals",getWithdrawals)
authRouter.post("/admin",loginAdmin)
authRouter.post("/admin/investments",authenticateAdmin,getInvestments)
authRouter.post("/admin/all",authenticateAdmin,getAdmins)
authRouter.post("/admin/payments",authenticateAdmin,getPayments)
authRouter.post("/admin/users",authenticateAdmin,getUsers)
authRouter.post("/admin/add",addAdmin)

authRouter.get("/support/",(req,res)=>{
    res.send("/")
})
module.exports = authRouter;