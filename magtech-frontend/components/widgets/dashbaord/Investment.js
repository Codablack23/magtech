import { Progress } from "antd"
import { useState } from "react"

export default function Investment({investment}){
  const oneDay = 60 * 60 * 24
   const oneDayM = 1000 * 60 * 60 * 24
   const duration = investment.duration
   const secondProfit =((investment.percentage_profit/duration)/oneDayM)
  
   const dailyProfit =  (investment.percentage_profit/duration) * 100
   const usage = Math.round((new Date(investment.expires) - new Date())/oneDayM)
   const [profit,setProfit] = useState(parseFloat(investment.amount)*(dailyProfit/100))


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