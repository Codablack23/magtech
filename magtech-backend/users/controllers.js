const { User } = require("./models")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const {validateFields,checkEmpty,matchFormat} = require("../services/validator")
const { Refferals } = require("../bots/models")
const { sendEmail } = require("../services/sendmail")
const { response } = require("express")


async function loginHandler(req,res){
    const {email,password} = req.body
    let result = {
        status:"",
        error:""
    }
    const errors = validateFields([
        {inputField:email,inputType:"email"},
        {inputField:password,inputType:"password"}
    ])
    if(errors.length !== 0){
      result.status = "field error"
      result.error = errors
    }
    else{
      try {
        const user = await User.findOne({where:{email:email}})
        if(user){
          const checkDetail = await bcrypt.compare(password,user.password)
          if(checkDetail){
            req.session.user = {email:user.email,ref_code:user.ref_code}
            res.setHeader('Access-Control-Allow-Headers', 'Set-Cookie')
            console.log(req.session.user)
            result.status = "Logged in"
            result.user = {email,ref_code:user.ref_code}
          }
          else{
            result.status = "Invalid Credentials"
            result.error = "Password or email invalid "
          }
        }
       else {
        result.status = "Invalid User"
        result.error = "User does not exist " 
      }
    } catch (error) {
        result.status = "Server error"
        result.error = "They must have been some issue please try again later"
      }
    }
    res.json(result)
}

async function registerHandler(req,res){
 const result={
   status:"Pending",
   err:""
 }
 const {refcode,email,password,phone,name} = req.body
console.log(req.body)
 const errors = validateFields([
    {inputField:email,inputType:"email"},
    {inputField:password,inputType:"password"},
    {inputField:name,inputType:"text",inputName:"Name"}
 ]) 
 if(errors.length > 0){
    result.status ="field error",
    result.err = errors
 }
 else{
  try {
    const refUser = checkEmpty(refcode)?"":await User.findOne({where:{ref_code:refcode}})
    const existingUser = await User.findOne({where:{Email:email}})
    console.log(refUser)
    if(refUser !== null || refUser === "" ){
       if(existingUser !== null){
        result.status = "failed"
        result.err = "User Already Exist"
       }
       else{
         const salt = await bcrypt.genSalt()
         const hashedPassword = await bcrypt.hash(password,salt)
         const ref_code = uuid.v4().slice(0,5)
         await User.create({
          email:email,
          password:hashedPassword,
          name:name,
          ref_code,
          phone_no:phone,
          reffered:refcode === "" ?false:true,
          ref:refcode
         })
         if(refcode !== ""){
          await Refferals.create({
            ref_code:refcode,
            first_gen:email,
            amount:0,
            second_gen:""
          })
         }
         req.session.user = {email,ref_code}
         result.status ="Success"
         result.user = {email,ref_code}
       }
    }
    else{
      result.status ="referral Error"
      result.err = "refferal code is invalid"
    }
  } catch (error) {
    result.status ="Internal server error"
    result.err = "server error please try again later"
  }
 }
 res.json(result)

}
async function sendResetPasswordToken(req,res){
  const {email} = req.session.user
  const genCode = uuid.v4().toString().slice(0,6)

  const result = {
    status:"pending",
    error:""
  }
  const {url} = await sendEmail({
    reciever:email,
    message_body:{
      html:`
        <h1 style="font-family:sans-serif;font-size:24px;">
           <b>Your password reset code is ${genCode} it expires in 30mins please do not share with anyone</b>
        </h1>
       <a>
       <button style="background:blue;color:white;width:140px;height:40px;font-size:18px;border:none;">Visit Page</button>
       </a>
        `
    }
  })
  if(url){
    result.status = "success",
    result.message = "Message sent to your email successfully"
    result.error = ""
    result.url = url
  }
  else{
    result.status = "Failed",
    result.error = "Message could sent to your email successfully"
  }
  res.json(result)
}

async function logoutHandler(req,res){
    const response ={
     status:"",
     error:""
    }
     await req.session.destroy()
     res.status(200)
     response.status = "Sucess"
     response.message = "Logged Out Successfully"
 
    res.json(response)
}

module.exports = {
    loginHandler,
    registerHandler,
    logoutHandler,
    sendResetPasswordToken,
}