import { Progress } from "antd"
import { useState } from "react"

export default function Investment({investment}){
  const date = new Date()
  const expires = new Date(investment.expires)
  const oneDay = 60 * 60 * 24
   const oneDayMs = oneDay * 1000
   const date_diff =  (expires - date)/oneDayMs
   const duration = date_diff > 0?date_diff:1
   const secondProfit =(((investment.percentage_profit)/duration)/oneDayMs)
   const dailyProfit =  (investment.percentage_profit/investment.duration) * 100
   const current_profit = (investment.amount * investment.percentage_profit/duration) 
   const usage = Math.round((expires - date)/oneDayMs)
   const [profit,setProfit] = useState(parseFloat(current_profit))


   setInterval(()=>{
    setProfit(prev=> prev + (secondProfit * investment.amount))
   },1000)
    return(
        <div className="mg-bg-dark mg-rounded mg__investment">
        <div className="mg__investment-desc mg-font-euclid mg-text-grey ">
            <p className="head mg-font-euclid mg-font-bold">${investment.amount}</p>
            <p className="head mg-font-euclid mg-text-warning mg-font-bold">${profit.toFixed(4)}</p>
        </div>
        <p className="mg-text-grey">{investment.bot}</p>
        <p className="mg-text-grey">+{dailyProfit.toFixed(2)}% daily profit</p>
        <div className="mg-w-90">
        <Progress type="line" strokeColor={"#fcd535"} 
         width={170}
         trailColor="#181a20"
         percent={usage/100}
         format={percent=><p className="mg-text-grey">{90 - usage}/90 days</p>}
          />
        </div>
      </div>
    )
}

export function AdminInvestment({investment}){
  const date = new Date()
  const expires = new Date(investment.expires)
  const oneDay = 60 * 60 * 24
   const oneDayMs = oneDay * 1000
   const date_diff =  (expires - date)/oneDayMs
   const duration = date_diff > 0?date_diff:1
   const secondProfit =(((investment.percentage_profit)/duration)/oneDayMs)
   const dailyProfit =  (investment.percentage_profit/investment.duration) * 100
   const current_profit = (investment.amount * investment.percentage_profit/duration) 
   const usage = Math.round((expires - date)/oneDayMs)
   const [profit,setProfit] = useState(parseFloat(current_profit))


   setInterval(()=>{
    setProfit(prev=> prev + (secondProfit * investment.amount))
   },1000)
    return(
        <div className="mg-bg-dark mg-rounded mg__investment">
        <div className="mg__investment-desc mg-font-euclid mg-text-grey ">
            <p className="head mg-font-euclid mg-font-bold">${investment.amount}</p>
            <p className="head mg-font-euclid mg-text-primary mg-font-bold">${profit.toFixed(4)}</p>
        </div>
        <p className="mg-text-grey">{investment.bot}</p>
        <p className="mg-text-grey">+{dailyProfit.toFixed(2)}% daily profit</p>
        <div className="mg-w-90">
        <Progress type="line" strokeColor={"#32DBC6"} 
         width={170}
         trailColor="#181a20"
         percent={usage/100}
         format={percent=><p className="mg-text-grey">{90 - usage}/90 days</p>}
          />
        </div>
      </div>
    )
}