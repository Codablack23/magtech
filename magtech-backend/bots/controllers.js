const { validateFields } = require("../services/validator")
const {Investment,Bot,Payment} = require("./models")
const {transfer} = require("../services/payments")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
 

async function getInvestments(req,res){
    const password = await bcrypt.hash('@magtech23',await bcrypt.genSalt())
    
    const result = {
        status:"pending",
        err:"",
    }
    try {
      const investments =  await Investment.findAll({where:{email:req.session.user.email}})
        result.status = "completed"
        result.pss = password
        result.investments = investments
    } catch (err) {
        result.status = 'Network Error'
        result.err = "an error occured in the server try again later"
    }

    res.json(result)
}
async function updatePayment(req,res){
   const result = {
    status:"pending",
    error:""
   }
   console.log(req.params)
   const {id} = req.params
   if(!uuid.validate(id)){
     result.status="Field Error"
     result.error = "please provide a valid uuid string"
   }else{
    try {
        const payment = await Payment.update({status:"paid"},{
            where:{
                payment_id:id
            }
        })
        if(payment){
            result.status = "Success"
            result.error = ""
            result.message = "Payment Completed Successfully"
        }
    } catch (error) {
        result.status ="Server Error",
        result.error = "an error occured in our server please check your network or try again later"
    }
   }  
  res.json(result)
}


async function invest(req,res){
    const {amount,bot_id} = req.body
    const date = new Date();
    const errors = validateFields([
        {inputField:amount,inputType:"number",inputName:"Amount"},
        {inputField:bot_id,inputType:"username",inputName:"Bot_ID"}
    ])
    const result = {
        status:"pending",
        error:""
    }
    if(errors.length > 0){
      result.status ="Field Error"
      result.error = errors
    }else{
        try {
            const bot = await Bot.findOne({
                where:{
                    email:req.session.user.email,
                    bot_id:bot_id}
                })

             let percent = parseFloat(bot.percentage_profit)
             let duration = parseInt(bot.duration)
             const expires = new Date(date.setDate(date.getDate() + duration)); 

            const investment = await Investment.create({
                email:req.session.user.email,
                bot:bot.bot_name,
                amount,
                percentage_profit:bot.percentage_profit,
                duration,
                returns:(percent * duration) * amount,
                expires:expires.toDateString()
            })
            if(investment){
            
                result.status="Completed"
                result.investment = {
                    amount,
                    bot_id,
                    expires:expires.toDateString(),
                    percentage_profit:bot.percentage_profit,
                }
            }
            else{
                result.status = 'Network Error'
                result.error = "an error occured in the server try again later"
            }
            } catch (error) {
                console.log(error)
                result.status = 'Network Error'
                result.error = "an error occured in the server try again later"
            }
    }
    console.log(result)
    res.json(result)
}

async function paymentHandler(req,res) {
    const {description,amount} = req.body
    
    const result = {
        status:"pending",
        error:""
    }

    const errors = validateFields([
        {inputField:description,inputType:"text",inputName:"description"},
        {inputField:amount,inputType:"number",inputName:"amount"},
    ])

    try {
     if(errors.length > 0){
        result.status = "input Error",
        result.error = errors
     }else{
       const payment_id = uuid.v4()
       const payment= await Payment.create({
        email:req.session.user.email,
        status:"unpaid",
        payment_id,
        description,
        amount,
       })
       if(payment){
        result.status = "Payment initiated"
        result.payment_id = payment_id
       }
     }  
    } catch (error) {
        result.status ="Network error",
        result.status="an internal error occured"
    }
    res.json(result)
}
async function buyBot(req,res){
   const {percent_profit,bot_name} = req.body
   console.log(req.body)

   date = new Date()
   const duration = 90
   const expires = new Date(date.setDate(date.getDate() + duration)); 
   const errors = validateFields([
    {inputField:percent_profit,inputType:"number",inputName:"Percent"},
    {inputField:bot_name,inputType:"username",inputName:"Bot_Name"}
   ])
   const result ={
    status:"pending",
    error:""

   }
   if(errors.length > 0){
    result.status = "Failed"
    result.error = errors 
   }
   try {
    const bot = await Bot.create({
        percentage_profit:percent_profit,
        bot_name,
        email:req.session.user.email,
        bot_id:uuid.v4().slice(0,4),
        expires,
        duration
    })
    if(bot){
        result.status ="success"
        result.message = "bot added sucessfully"
        result.bot = {
            bot_name,
            bot_id,
            expires,
            duration
        }
    }else{
        result.status = "Failed"
        result.error = "an internal error occurred please check your network or try again later"
    }
   } catch (error) {
      result.status = "Failed"
      result.error = "an internal error occurred please check your network or try again later"
   }
   res.json(result)
}
async function getBots(req,res){
    const {user} = req.session
    const result = {
        status:"pending",
        error:""
    }
    try {
        const bots = await Bot.findAll({where:{email:user.email}})
        result.status = "completed",
        result.bots = bots
    } catch (error) {
        result.status = "Server Error"
        result.error = "An error occured in our server check your network or try again later"
    }
  res.json(result)
}
async function getPayments(req,res){
    const result = {
        status:"pending",
        err:"",
    }
    try {
      const payments =  await Payment.findAll({where:{email:req.session.user.email}})
        result.status = "completed"
        result.payments = payments
    } catch (err) {
        result.status = 'Network Error'
        result.err = "an error occured in the server try again later"
    }

    res.json(result)
}
module.exports={
  getInvestments,
  invest,
  paymentHandler,
  updatePayment,
  getPayments,
  buyBot,
  getBots
}