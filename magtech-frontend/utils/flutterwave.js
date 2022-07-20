export function getConfig(data){
        const config = {
            public_key:FW_PUBLIC,
            tx_ref:Date.now(),
            currency:"NGN",
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





