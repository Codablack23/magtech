const { User,ResetCode} = require("./models")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const {validateFields,checkEmpty,matchFormat} = require("../services/validator")
const { Refferals } = require("../bots/models")
const { sendEmail } = require("../services/sendmail")
const moment = require("moment")


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
async function changePassword(req,res){

   const code = req.params.id
   const {new_password} = req.body
   const email = req.session.user.email
   const errors = validateFields([
    {inputName:'reset_code',inputType:"username",inputField:code},
    {inputType:"password",inputField:new_password}
   ])
   const current_date = new Date()
   const result ={
    status:"pending",
    err:"no activity"
   }
   if(errors.length < 1){
    try {
      const reset_code = await ResetCode.findOne({where:{
        code:code,
        email:email,
        type:"change"
      }})
      if(reset_code){
        const time_left = (reset_code.expires - current_date)/60000
        if(time_left <= 30 && time_left > 0){
            const salt = await bcrypt.genSalt()
            const password = await bcrypt.hash(new_password,salt)
            const user_update = await User.update({
              password:password
            },{
              where:{
                email:email
              }
            })
            if(user_update){
              await ResetCode.destroy({
                where:{
                  email:email,
                  code:code
                }
              })
              result.err = ""
              result.status = "success"
              result.message = "password changed successfully"
            }else{
              result.err = 'could not change your password try again later'
              result.status = "Password Change Failed"
            }
        }else{
          result.err = 'reset code is not longer valid'
          result.status = "Expired Code"
        }
      }else{
        result.err = 'reset code is not valid'
        result.status = "Code Error"
      }
     } catch (error) {
      result.err = 'an error occured in our server check your internet connection and try again'
      result.status = "Internal Server Error"
     }
   }else{
     result.status = "field error"
     result.err = errors
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
  try {
     await ResetCode.create({
      code:genCode,
      email:email,
      type:"change",
      expires:moment(new Date()).add(30,"m").toDate()
    })
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
      result.error = "Message could not be sent to your email"
    }
  
  } catch (error) {
    console.log(error)
    result.status ="Internal server error"
    result.err = "server error please try again later"
  }
  res.json(result)
}

async function logoutHandler(req,res){
    const response ={
     status:"",
     error:""
    }
     await delete req.session.user
     res.status(200)
     response.status = "Sucess"
     response.message = "Logged Out Successfully"

    res.json(response)
}
async function forgotPassword(req,res){
  const {email} = req.body
  const genCode = uuid.v4().toString().slice(0,6)
  const result = {
    status:"pending",
    error:""
  }
  try {
     const userExists = await User.findOne({
      where:{email:email}
     })
     if(userExists){
      await ResetCode.create({
        code:genCode,
        email:email,
        type:"change",
        expires:moment(new Date()).add(30,"m").toDate()
      })
      const {url} = await sendEmail({
        reciever:email,
        message_body:{
          html:`
            <div style="margin:10px auto;max-width:500px;text-align:center">
            <h1>Magtech</h1>
            <h1 style="font-family:sans-serif;font-size:24px;">
               <b>Your password reset code is ${genCode} it expires in 30mins please do not share with anyone</b>
            </h1>
           <a>
           <button style="background:blue;color:white;width:140px;height:40px;font-size:18px;border:none;">Visit Page</button>
           </a>
            </div>
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
     }
    else{
      result.status = "Failed",
      result.error = "User does not exist"
    }
  
  } catch (error) {
    console.log(error)
    result.status ="Internal server error"
    result.err = "server error please try again later"
  }
  res.json(result)
}
async function resetPassword(req,res){
  const {code,new_password,email} = req.body
  const errors = validateFields([
   {inputName:'reset_code',inputType:"username",inputField:code},
   {inputType:"password",inputField:new_password},
   {inputType:"email",inputField:email}
  ])
  const current_date = new Date()
  const result ={
   status:"pending",
   err:"no activity"
  }
  if(errors.length === 0){
   try {
     const reset_code = await ResetCode.findOne({where:{
       code:code,
       email:email,
       type:"change"
     }})
     if(reset_code){
       const time_left = (reset_code.expires - current_date)/60000
       if(time_left <= 30 && time_left > 0){
           const salt = await bcrypt.genSalt()
           const password = await bcrypt.hash(new_password,salt)
           const user_update = await User.update({
             password:password
           },{
             where:{
               email:reset_code.email
             }
           })
           if(user_update){
             await ResetCode.destroy({
               where:{
                 email:email,
                 code:code
               }
             })
             result.err = ""
             result.status = "success"
             result.message = "password changed successfully"
           }else{
             result.err = 'could not change your password try again later'
             result.status = "Password Change Failed"
           }
       }else{
         result.err = 'reset code is not longer valid'
         result.status = "Expired Code"
       }
     }else{
       result.err = 'reset code is not valid'
       result.status = "Code Error"
     }
    } catch (error) {
      console.log(error)
     result.err = 'an error occured in our server check your internet connection and try again'
     result.status = "Internal Server Error"
    }
  }else{
    result.status = "field error"
    result.err = errors
  }
  res.json(result)
}
module.exports = {
    loginHandler,
    registerHandler,
    logoutHandler,
    sendResetPasswordToken,
    changePassword,
    forgotPassword,
    resetPassword
}