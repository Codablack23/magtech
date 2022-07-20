export function getConfig(data){
        const FW_PUBLIC =process.env.NEXT_PUBLIC_FW_PUBLIC
     
        const config = {
            public_key:FW_PUBLIC,
            tx_ref:Date.now(),
            currency:"USD",
            payment_options: 'card,bank_transfer',
            amount:data.amount,
            customer:{
                email:data.email
            },
            customizations:{
                title:"Magtech payment",
                description:data.description
            }
        }
        return config
}





