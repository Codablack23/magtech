const Flutterwave = require("flutterwave-node-v3")
const dotenv = require('dotenv').config()

const fw_keys = {
  public:process.env.FW_PUBLIC,
  private:process.env.FW_SECRET
}

async function transfer(details){
   const flutterwave = new Flutterwave(fw_keys.public,fw_keys.private)
   console.log(details)
   return await flutterwave.Transfer.initiate(details)
}


module.exports ={
  transfer
}
