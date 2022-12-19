const { useLazerpay } = require("lazerpay-react")

export const useCrypto =({onSuccess,onError,onClose,name,product_name,amount})=>{
   const PUBLIC_KEY = process.env.NEXT_PUBLIC_LP_PUBLIC 
   const config = {
        publicKey: PUBLIC_KEY,
        customerName:name,
        customerEmail: 'codablack24@gmail.com',
        currency: 'USD', // USD, NGN, AED, GBP, EUR
        amount, // amount as a number or string // unique identifier
        acceptPartialPayment: true,
        metadata:{
            'product name': product_name,
            'Product Owner': 'Magtech'
        }, // metadata (optional) is an object of information you wish to pass
        onSuccess,
        onClose,
        onError,
   }
   const initializePayment = useLazerpay(config)

   return initializePayment
}