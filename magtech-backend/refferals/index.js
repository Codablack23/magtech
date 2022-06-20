const express = require("express")

const refRouter = express.Router()

refRouter.get("/",(req,res)=>{
    res.send('Ref')
})

module.exports = refRouter;