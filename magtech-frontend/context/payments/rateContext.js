import { createContext, useState } from "react";
import Admin from "~/utils/Admin";
export const RateContext = createContext({})

export default function RatesProvider({children}){
    const [paymentRates,setPaymentRates] = useState({
     USD_NGN:0.00,
     USD_EUR:0.00
    })
    const [withdrawRates,setWithdrawRates] = useState({
      USD_NGN:0.00,
      USD_EUR:0.00
    })
    async function getRates(){
      const {exchanges} = await Admin.getRates()
      if(exchanges){
        const p_rates = {}
        const w_rates = {}
        exchanges.filter(ex=>ex.rate_type === "payment").forEach(element => {
          p_rates[element.conversion] = element.rate;
        });
        exchanges.filter(ex=>ex.rate_type === "withdrawal").forEach(element => {
          w_rates[element.conversion] = element.rate;
        });
        setPaymentRates(p_rates)
        setWithdrawRates(w_rates)
      }
    }
    useState(()=>{
      getRates()
    },[])
    return(
        <RateContext.Provider value={{paymentRates,withdrawRates}}>
         {children}
        </RateContext.Provider>
    )
}