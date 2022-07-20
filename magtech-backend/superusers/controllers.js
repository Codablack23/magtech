const {Admin} = require('./models')
const {User} = require("../users/models")
const {Bot,Payment,Investment} = require("../bots/models")
const { validateFields } = require('../services/validator')
const bcrypt = require("bcrypt")
const uuid = require("uuid")


async function createAdmin(req,res){
    const salt = await bcrypt.genSalt()
    const hashed = await bcrypt.hash("@_magtech123#",salt)
    await Admin.create({
       username:"admin@magtech",
       password:hashed,
       admin_id:uuid.v4().toString().slice(0,5),
       isSuperUser:true
    })
    res.json({
        status:"success"
    })
}


async function UpdateAdmin(req,res){
    const salt = await bcrypt.genSalt()
    const hashed = await bcrypt.hash("@magtech23",salt)
    await Admin.update({password:hashed},{
        where:{
            username:"admin23"
        }
    })
    res.json({
        status:"success"
    })
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

module.exports={
    getInvestments,
    getPayments,
    getBots,
    getUsers, 
    loginAdmin,
    addAdmin,
    UpdateAdmin,
    createAdmin,
  }