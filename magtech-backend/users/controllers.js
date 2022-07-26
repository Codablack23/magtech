const { User } = require("./models")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const {validateFields,checkEmpty,matchFormat} = require("../services/validator")


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
          ref:refUser !== null?refUser.email:""
         })
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
}