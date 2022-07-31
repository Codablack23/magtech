const express = require("express")
const {authenticate} = require("../services/auth")
const {getInvestments,invest,paymentHandler,updatePayment,buyBot, getBots, getPayments, getRefs, deletePayment} = require("./controllers")

const botsRouter = express.Router()

botsRouter.post("/delete-payment/:id",authenticate,deletePayment)
botsRouter.post("/",authenticate,getBots)
botsRouter.post("/refs",authenticate,getRefs)
botsRouter.post("/buy",authenticate,buyBot)
botsRouter.post("/payments",authenticate,getPayments)
botsRouter.post("/investments",authenticate,getInvestments)
botsRouter.post("/invest",authenticate,invest)
botsRouter.post("/add-payment",authenticate,paymentHandler)
botsRouter.post("/add-payment/:id",authenticate,updatePayment)
module.exports = botsRouter;