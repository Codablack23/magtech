import axios from "axios";



function getEnv(){
    return {
      env:process.env.NEXT_PUBLIC_ENV,
      api:process.env.NEXT_PUBLIC_API_ENDPOINT,
      api_key:process.env.NEXT_PUBLIC_CAK
    }
  }

class CryptoPay{
    // data= {  local_price: {
    //           amount: 100,
    //           currency: 'USD'
    //         },
    //         name: 'Bot Payment',
    //         description: 'Bot Payment',
    //         pricing_type: 'fixed_price',
    //         redirect_url: 'https://charge/completed/page',
    //         cancel_url: 'https://charge/canceled/page'
    //       }
        
    api = "https://api.commerce.coinbase.com/charges"
    API_KEY = getEnv().api_key
    config = {
        headers:{
         "accept": 'application/json', 
         'content-type': 'application/json',
         "x-cc-api-key":this.API_KEY
        },
     }
  
    
    async charge(payment_data){

       try {
        const res = await fetch(this.api,{
            method:"POST",
            body:JSON.stringify(payment_data),
            ...this.config
        })
        return (await res.json())
    } catch (error) {
        return {
            status:"failed",
            fetch_err:error,
            error:"couldn't connect with server please try again later"
        }
       }
     }
    
     async checkCharge(id){
        try {
         const res = await fetch(`${this.api}/${id}/resolve`,{
             method:"POST",
             ...this.config
         })
         return (await res.json())
        } catch (error) {
         return {
             status:"failed",
             fetch_err:error,
             error:"couldn't connect with server please try again later"
         }
        }
      }
    
   
}

export default new CryptoPay()