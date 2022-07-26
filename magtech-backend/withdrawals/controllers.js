const { transfer } = require("../services/payments")
const {v4} = require('uuid')
const {Withdrawal} = require("./models")
const {generateWithdrawDetails, getBalance} = require("../services/utils")

async function getWithdrawals(req,res){
   const email = req.session.user.email
   const result = {
    status:"pending",
    error:""
   }
   try {
    const withdrawals = await Withdrawal.findAll({where:{email:email}})
    result.status = "Data Fetched"
    result.withdrawals = withdrawals

   } catch (error) {
    result.status = "Server Error"
    result.error = "An error occured in the server please try again later"
    throw error
   }
   res.json(result)
}
async function makeWithdrawal(req,res){
    const {amount} = req.body
    const email = req.session.user.email
    const result = {
        status:"pending",
        error:""
    }
    const transfer_details = generateWithdrawDetails({...req.body,email})
    if(parseFloat(amount) >= 10) {
        if(transfer_details.generated){   
            const balance = getBalance(email)
            if(amount <= 100){
                try {
                    const withdrawal_id = v4()
                    const withdraw = await Withdrawal.create({
                        email,
                        status:"unpaid",
                        withdrawal_id,
                        amount,
                    })
                    if(withdraw){
                       
                        const transfer_res = await transfer(transfer_details.details)
                        // console.log(transfer_res)
                        if(transfer_res.status === "success"){
            
                           await Withdrawal.update({status:"paid"},{where:{
                            withdrawal_id:withdrawal_id,
                           }})
            
                           result.status = "success"
                           result.message = `your withdrawal was successful and $${amount} sent to your bank account`,
                           result.details = {
                            ...transfer_details.details,
                            reference:transfer_res.data.reference
                           }
                        }
                        else{
                            result.error=transfer_res.data.complete_message
                            result.status=transfer_res.message
                        }
                    }else{
                        result.error="The withdrawal process could not be initiated check your network connection or try again later"
                        result.status="Withdrawal Failed"
                    }
                  } catch (error) {
                    console.log(error)
                    result.status = "Server Error"
                    result.error = "An Error occured within our server please check your internet or try again"
                  }
            }else{
                result.status = "Amount Error"
                result.error = "Insufficient Balance"
            }
          }else{
              result.status = "Field Error"
              result.error = transfer_details.errors
          }

    }else{
      result.status = "Amount Error"
      result.error = "withdrawal amount must start from $10"
    }

    res.json(result)
}
module.exports = {
    getWithdrawals,
    makeWithdrawal
}