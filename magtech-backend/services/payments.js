const Flutterwave = require("flutterwave-node-v3")
const dotenv = require('dotenv').config()
const fetch = require("node-fetch");
const uuid = require("uuid")

const flutter_config = {
    public:process.env.FW_PUBLIC,
    private:process.env.FW_SECRET
}
async function transfer(details){
   const {
    account_bank,
    account_number,
    amount,
    debit_currency,
   } = details
   const flutterwave = new Flutterwave(flutter_config.public,flutter_config.private)
   await flutterwave.Transfer.initiate({

   })
}


module.exports ={
  transfer
}
