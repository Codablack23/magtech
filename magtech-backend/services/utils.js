const { Investment,Bot,Payment,Refferals} = require("../bots/models")
const {Withdrawal} = require("../withdrawals/models")
const {User} = require("../users/models")
const { validateFields } = require("./validator")
const init = { 
    account_name:"",
    account_type:"",
    account_number:"",
    bank:"",
    currency:"",
    firstname:"",
    lastname:"",
    email:"",
    country:"",
    routing_number:"",
    swift_code:"",
    address:"",
    street_name:"",
    street_no:"",
    postal_code:"",
    city:"",
    amount:""
}


function generateWithdrawDetails(acc_details = {...init}){
    
    const { 
        account_name,
        account_type,
        account_number,
        bank,
        currency,
        firstname,
        lastname,
        email,
        country,
        routing_number,
        swift_code,
        address,
        street_name,
        street_no,
        postal_code,
        city,
        amount} = acc_details

        console.log(account_type)
    const details = {
        debit_currency:"USD",
        narration:"withdrawal Payment",
        meta:{}
    }
    let errors = []
    
    if(account_type){
        switch (account_type) {
            case "NGN":
                errors = validateFields([
                    {inputField:account_name,inputType:"text",inputName:"Account_Name"},
                    {inputField:account_number,inputType:"number",inputName:"Account_Number"},
                    {inputField:bank,inputType:"username",inputName:"Bank Name"},
                    {inputField:amount,inputType:"number",inputName:"Amount"},
                    {inputField:currency,inputType:"word",inputName:"Currency"},
                ])
                details.account_name = account_name
                details.account_bank = bank
                details.account_number = account_number
                details.amount = amount
                details.currency = currency
                
                return errors.length === 0
                ?{details,generated:true}
                :{errors,generated:false}

            case "NGN_USD":
                errors = validateFields([
                    {inputField:account_name,inputType:"text",inputName:"Account_Name"},
                    {inputField:firstname,inputType:"word",inputName:"First_Name"},
                    {inputField:lastname,inputType:"word",inputName:"Last_Name"},
                    {inputField:account_number,inputType:"number",inputName:"Account_Number"},
                    {inputField:bank,inputType:"username",inputName:"Bank Name"},
                    {inputField:amount,inputType:"number",inputName:"Amount"},
                    {inputField:currency,inputType:"word",inputName:"Currency"},
                    {inputField:country,inputType:"word",inputName:"Country"},
                ])
                details.account_bank = bank
                details.account_number = account_number
                details.amount = amount
                details.currency = currency
                details.meta ={
                    first_name:firstname,
                    last_name:lastname,
                    sender:"Magtech Inc",
                    merchant:"Magtech Inc",
                    email,
                    country,

                } 
                
                
                return errors.length === 0
                ?{details,generated:true}
                :{errors,generated:false}

            case "USD":
                errors = validateFields([
                    {inputField:account_name,inputType:"text",inputName:"Account_Name"},
                    {inputField:account_number,inputType:"username",inputName:"Account_Number"},
                    {inputField:bank,inputType:"text",inputName:"Bank_Name"},
                    {inputField:amount,inputType:"number",inputName:"Amount"},
                    {inputField:currency,inputType:"word",inputName:"Currency"},
                    {inputField:country,inputType:"word",inputName:"Country"},
                    {inputField:routing_number,inputType:"number",inputName:"Routing_Number"},
                    {inputField:swift_code,inputType:"username",inputName:"Swift_Code"},
                    {inputField:address,inputType:"address",inputName:"Address"},
                ])
                details.amount = amount
                details.currency = currency
                details.beneficiary_name = account_name
                details.meta ={
                    AccountNumber:account_number,
                    BeneficiaryName:account_name,
                    RoutingNumber: routing_number,
                    SwiftCode: swift_code,
                    BankName: bank,
                    BeneficiaryName:account_name,
                    BeneficiaryAddress: address,
                    BeneficiaryCountry:country

                } 
                
                
                return errors.length === 0
                ?{details,generated:true}
                :{errors,generated:false}

            case "EUR":
                errors = validateFields([
                    {inputField:account_name,inputType:"text",inputName:"Account_Name"},
                    {inputField:account_number,inputType:"username",inputName:"Account_Number"},
                    {inputField:bank,inputType:"text",inputName:"Bank_Name"},
                    {inputField:amount,inputType:"number",inputName:"Amount"},
                    {inputField:currency,inputType:"word",inputName:"Currency"},
                    {inputField:country,inputType:"word",inputName:"Country"},
                    {inputField:routing_number,inputType:"number",inputName:"Routing_Number"},
                    {inputField:swift_code,inputType:"username",inputName:"Swift_Code"},
                    {inputField:postal_code,inputType:"number",inputName:"Postal_Code"},
                    {inputField:street_name,inputType:"address",inputName:"Street_Name"},
                    {inputField:street_no,inputType:"number",inputName:"Street_Number"},
                    {inputField:city,inputType:"word",inputName:"City"},
                    
                ])
                details.amount = amount
                details.currency = currency
                details.beneficiary_name = account_name
                details.meta ={
                    AccountNumber:account_number,
                    BeneficiaryName:account_name,
                    RoutingNumber: routing_number,
                    SwiftCode: swift_code,
                    BankName: bank,
                    BeneficiaryName:account_name,
                    PostalCode: postal_code,
                    StreetNumber:street_no,
                    StreetName: street_name,
                    City:city,
                    BeneficiaryCountry:country

                } 
                
                
                return errors.length === 0
                ?{details,generated:true}
                :{errors,generated:false}

            default:
             errors =[{message: "invalid account type only EUR, USD, NGN, NGN_USD types supported"}]
             return {errors,generated:false}
        
        }
    } else { 
     errors = [{message:"account type is required"}] 
     return {errors,generated:false} 
    }
}
async function getBalance(email){
    const withdrawals = await Withdrawal.findAll({where:{email:email}})
    const payments = await Payment.findAll({where:{email:email}})
    const bots = await Bot.findAll({where:{email:email}})
    const user = await User.findOne({where:{email:email}})
    const refs = await Refferals.findAll({where:{ref_code:user.ref_code}})
    const investments = await Investment.findAll({where:{email:email}})

    const p_total = payments.filter(p=>p.status === "paid").reduce((total,p)=>(total +p.amount),0)
    const i_total = investments.filter(i=>{
            const expires = new Date(i.expires)
            const timeLeft = (expires - date) /(1000 * 60 * 60 * 24 )
            return timeLeft > 0
    }).reduce((a,b)=>(a + b.amount),0)
    const w_total =  withdrawals.filter(p=>p.status === "paid").reduce((a,b)=>(a + b.amount),0)
    const ref_total =  refs.reduce((a,b)=>(a + b.amount),0)
    const b_total = bots.reduce((a,b)=>(a + b.bot_price),0)
    const funds = p_total - i_total - w_total - ref_total - b_total
    const iTotal = investments.reduce((a,b)=>{ 
        const expires = new Date(b.expires)
        let timeLeft = (expires - date) /(1000 * 60 * 60 * 24 )
        timeLeft = timeLeft < 0?1:timeLeft
        return a + ((b.amount * b.percentage_profit)/timeLeft)
    },0)
    return funds + iTotal;
}
module.exports = {
    generateWithdrawDetails,
    getBalance
}