export default function validateFields(validator){
    function isEmpty(field){
       field = field.toLowerCase()
       return field.startsWith(" ") || field.endsWith(" ") || field.includes(" ") || field == ""
    }
    function addErrors(errorArray,message,fieldType){
        errorArray.push({
            field:fieldType.toLowerCase().replace(" ","_"),
            error:`${fieldType} ${message}`
          })
    }
    function matchFormat(field,regex){
      return field.match(regex) === null
    }
  
    let errors = []
    const fieldTypeObject = {
       email:{
         emailRegex:/[\w+]\@\w+\.\w+(\.\w+)?$/gi,
         validate(field,fieldName='Email'){
          if(isEmpty(field)){
            addErrors(errors,"must not be empty or contain whitespace",fieldName)
          }
          else if(matchFormat(field,this.emailRegex)){
            addErrors(errors,"format invalid",fieldName)
          }
         }
       },
       password:{
         validate(field=" ",fieldName="Password"){
           if(isEmpty(field)){
            addErrors(errors,"must not be empty or contain whitespace",fieldName)
           }
           else if(field.length < 8){
            addErrors(errors,"must be atleast 8 characters long",fieldName)
           }
          //  else if(matchFormat(field,/[@|#]+/g) || (matchFormat(field,/\d+/g))){
          //   addErrors(errors,"must contain atleast a number and special characters like(@, _, #) ","Password")
          //  }
         }
       },
       username:{
        validate(field=" ",fieldName="Username"){
          if(isEmpty(field)){
            addErrors(errors,"must not be empty or contain whitespace",fieldName)
          }
          else if(field.length < 3){
            addErrors(errors,"must atleas be 3 characters long",fieldName)
          }
          else if(matchFormat(field,/\w+/gi) || field.includes(" ")){
            addErrors(errors,"must contain only alphabets and numbers",fieldName)
          }
        }
       },
       refcode:{
        validate(field=" ",fieldName="Ref Code"){
          if(isEmpty(field)){
            addErrors(errors,"must not be empty or contain whitespace",fieldName)
          }
          else if(field.length < 5){
            addErrors(errors,"must atleast be 5 characters long",fieldName)
          }
          else if(matchFormat(field,/\w+/gi) || field.includes(" ")){
            addErrors(errors,"must contain only alphabets and numbers",fieldName)
          }
        }
       },
       text:{
        validate(field=" ",fieldName="Text"){
          if(field.startsWith(" ")|| field.endsWith(" ")){
            addErrors(errors,"must not be empty",fieldName)
          }
          else if(field.length < 3){
            addErrors(errors,"must atleast be 3 characters long",fieldName)
          }
          else if(field.match(/[\d|@|_|#|$|%|!|&]+/g) !== null){
            addErrors(errors,"must contain only alphabets",fieldName)
          }
        }
       },
       phone:{
        validate(field="",fieldName="Phone Number"){
          if(isEmpty(field)){
            addErrors(errors,"must not be empty",fieldName)
          }
          else if(field.length < 9 ){
            addErrors(errors,"must atleast be 9 digits long",fieldName)
          }
          else if(field.match(/[d|+]+/) !== null){
            addErrors(errors,"must contain only digits and +",fieldName)
          }
        }
       },
       word:{
        validate(field=" ",fieldName="Text"){
          if(isEmpty(field)){
            addErrors(errors,"must not be empty",fieldName)
          }
          else if(field.length < 2){
            addErrors(errors,"must atleast be 2 characters long",fieldName)
          }
          else if(field.match(/[\d|@|_|#|$|%|!|&]+/g) !== null){
            addErrors(errors,"must contain only alphabets",fieldName)
          }
        }
       },
       number:{
        validate(field="",fieldName="Number"){
          if(isEmpty(field.toString())){
            addErrors(errors,"must not be empty",fieldName)
          }
          else if(field.toString().match(/[0-9|.]+/g) === null){
            addErrors(errors,"must contain only numbers",fieldName)
          }
        }
       },
        address:{
        validate(field=" ",fieldName="Address"){
          if(field.startsWith(" ")|| field.endsWith(" ")){
            addErrors(errors,"must not be empty",fieldName)
          }
          else if(field.length < 3){
            addErrors(errors,"must atleast be 3 characters long",fieldName)
          }
          else if(field.match(/[|@||#|$|%|!|&]+/g) !== null){
            addErrors(errors,"must contain only alphabets numbers or _ and -",fieldName)
          }
        }
       }

     }
   
    if(validator.length > 0){
        validator.forEach((input=>{
            const {inputType,inputField,inputName} = input
            fieldTypeObject[inputType].validate(inputField,inputName)
        }))
    }
    else{
        errors.push({message:"no fields to validate"})
    }
     return errors
   }

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

export function validateWithdrawFields(acct_details=init){
  
  const { 
    account_name,
    account_type,
    account_number,
    bank,
    currency,
    firstname,
    lastname,
    country,
    routing_number,
    swift_code,
    address,
    street_name,
    street_no,
    postal_code,
    city,
    amount} = acct_details

  console.log(account_type)  
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
         break
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
    
            break
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
            break
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
            break
        default:
         errors = [{
          field:"account_type",
          message:"invalid account type only EUR, USD, NGN, NGN_USD types supported"}
        ]
        break
    }


  } else { 
    errors = [
      {
      field:"account_type",
      message:"account type is required"
      }
    ] 
  }
return errors
}