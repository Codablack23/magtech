const {Admin,Exchange} = require('./models')
const {User} = require("../users/models")
const {Bot,Payment,Investment} = require("../bots/models")
const { validateFields } = require('../services/validator')
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const { Withdrawal } = require('../withdrawals/models')
const dotenv = require("dotenv").config()


const admin = {
  username:process.env.ADMIN_USERNAME,
  password:process.env.ADMIN_PASSWORD
}
async function createAdmin(req,res){
    const salt = await bcrypt.genSalt()
    const hashed = await bcrypt.hash(admin.password,salt)
    await Admin.create({
       username:admin.username,
       password:hashed,
       admin_id:uuid.v4().toString().slice(0,5),
       isSuperUser:true
    })
    res.json({
        status:"success"
    })
}

async function getExchanges(req,res){
  const result ={
    status:"pending",
    error:"no response yet"
  }
  try {
     const exchanges = await Exchange.findAll()
     result.error =""
     result.status ="success"
     result.exchanges = exchanges
  } catch (error) {
    result.status ="Server Error"
    result.error = "we could not get any result due to an internal error please try again later"
  }
  res.json(result)
}
async function updateExchange(req,res){
  const {rate,type,conversion} = req.body
  const result ={
    status:"pending",
    error:"no response yet"
  }
  const errors = validateFields([
    {inputType:"number",inputField:rate,inputName:"Exchange"},
    {inputType:"username",inputField:type,inputName:"rate_type"},
    {inputType:"username",inputField:conversion,inputName:"Conversion"}
  ])
  if(errors.length > 0){
    result.error = errors
    result.status = "field error"
  }
  else{
    
  try {
    const exchange = Exchange.update({
      rate:rate
    },{
      where:{
        rate_type:type,
        conversion:conversion
      }
    })
    if(exchange){
      result.status ="success"
      result.error = ""
      result.message = "exchange updated successfully"
    }
    else{
      result.status ="failed"
      result.error = "could not update exchange rate please try again later"
    }
  } catch (error) {
    result.status ="Server Error"
    result.error = "we could not get any result due to an internal error please try again later"
  }
  }
  res.json(result)
}

async function loginAdmin(req,res){
    const {username,password} = req.body
    let result = {
        status:"",
        error:""
    }
    const errors = validateFields([
        {inputField:username,inputType:"username"},
        {inputField:password,inputType:"password"}
    ])
    if(errors.length !== 0){
      result.status = "field error"
      result.error = errors
    }
    else{
      try {
        const user = await Admin.findOne({where:{username:username}})
        if(user){
          const checkDetail = await bcrypt.compare(password,user.password)
          if(checkDetail){
            req.session.admin = {username}
            req.session.admin_id = user.admin_id
            res.setHeader('Access-Control-Allow-Headers', 'Set-Cookie')
            result.status = "Logged in"
            result.admin = {username,admin_id:user.admin_id}
          }
          else{
            result.status = "Invalid Credentials"
            result.error = "You are not authorized"
          }
        }
       else {
        result.status = "Invalid User"
        result.error = "You are not authorized " 
      }
    } catch (error) {
        result.status = "Server error"
        result.error = "They must have been some issue please try again later"
      }
    }
    res.json(result)
}
async function addAdmin(){
    
}

async function getUsers(req,res){
    const result = {
        status:"pending",
        err:"",
    }
    try {
      const users =  await User.findAll()
        result.status = "completed"
        result.users = users.map(user=>{
            return {
                email:user.email,
                name:user.name,
                phone:user.phone_no,
                createdAt:user.createdAt
            }
        })
    } catch (err) {
        result.status = 'Network Error'
        result.err = "an error occured in the server try again later"
    }

    res.json(result)
}
async function getInvestments(req,res){
    const result = {
        status:"pending",
        err:"",
    }
    try {
      const investments =  await Investment.findAll()
        result.status = "completed"
        result.investments = investments
    } catch (err) {
        result.status = 'Network Error'
        result.err = "an error occured in the server try again later"
    }

    res.json(result)
}

async function getBots(req,res){
    const result = {
        status:"pending",
        error:""
    }
    try {
        const bots = await Bot.findAll()
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
      const payments =  await Payment.findAll()
        result.status = "completed"
        result.payments = payments
    } catch (err) {
        result.status = 'Network Error'
        result.err = "an error occured in the server try again later"
    }

    res.json(result)
}
async function getWithdrawals(req,res){
  const result = {
    status:"pending",
    err:"",
}
try {
    const withdrawals = await Withdrawal.findAll()
    result.status = "completed"
    result.withdrawals = withdrawals
} catch (err) {
    result.status = 'Network Error'
    result.err = "an error occured in the server try again later"
}

res.json(result)
}
async function getAdmins(req,res){
  const result = {
    status:"pending",
    err:"",
}
try {
  const admins =  await Admin.findAll({where:{isSuperUser:false}})
    result.status = "completed"
    result.admins =  admins.map(user=>{
      return {
          username:user.username,
          admin_id:user.admin_id,
          createdAt:user.createdAt
      }
  })
} catch (err) {
    result.status = 'Network Error'
    result.err = "an error occured in the server try again later"
}

res.json(result)
};

module.exports={
    getInvestments,
    getPayments,
    getBots,
    getUsers, 
    loginAdmin,
    addAdmin,
    createAdmin,
    getAdmins,
    getWithdrawals,
    updateExchange,
    getExchanges,
  }