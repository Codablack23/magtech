const nodemailer = require("nodemailer")
const dotenv = require('dotenv').config()

async function generateEmailAccount(){
    return await nodemailer.createTestAccount 
}



async function sendEmail({reciever,subject,message_body}){
//  const {user,password} = await generateEmailAccount()
 try {
    const transport = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'modesto.gislason29@ethereal.email',
            pass: 'FwvzxWnrf4zQNkB2BM'
        },
    })
    
    const mail = await transport.sendMail({
        from:"Magtech Inc <magtech@gmail.com>",
        to:reciever.toString(),
        subject,
        ...message_body
    })
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mail))
    return {
      messageId:mail.messageId,
      url:nodemailer.getTestMessageUrl(mail)
     }
    
 } catch (error) {
    return{error}
 }
}

module.exports = {
    sendEmail
}
