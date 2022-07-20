const express = require("express")
const {authenticate} = require("../services/auth")
const {getInvestments,invest,paymentHandler,updatePayment,buyBot, getBots, getPayments} = require("./controllers")

const botsRouter = express.Router()


botsRouter.post("/",authenticate,getBots)
botsRouter.post("/buy",authenticate,buyBot)
botsRouter.post("/payments",authenticate,getPayments)
botsRouter.post("/investments",authenticate,getInvestments)
botsRouter.post("/invest",authenticate,invest)
botsRouter.post("/add-payment",authenticate,paymentHandler)
botsRouter.post("/add-payment/:id",authenticate,updatePayment)
module.exports = botsRouter;