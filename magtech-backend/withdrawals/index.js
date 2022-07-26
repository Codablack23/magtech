const express = require("express")
const { authenticate } = require("../services/auth")
const {getWithdrawals,makeWithdrawal} = require("./controllers")
const withdrawRouter = express.Router()

withdrawRouter.post("/",authenticate,getWithdrawals)
withdrawRouter.post("/withdraw",authenticate,makeWithdrawal)

module.exports = withdrawRouter;