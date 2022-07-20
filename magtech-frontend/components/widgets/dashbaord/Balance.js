import { Progress } from "antd"
import { useState,useEffect } from "react"
import Payments from "~/utils/Payment"


export default function DashboardBalance(){
    const [balance,setBalance] = useState(0)
    const [investmentsTotal,setInvestment] = useState(0)
    const [refferralsTotal,setRefferral] = useState(0)
    const [isLoading,setIsLoading] = useState(false)
    const [withdrawalTotal,setWithdrawal] = useState(0)

    async function getData(){
        setIsLoading(true)
        const investmentData = await Payments.getInvestments()
        const iTotal = investmentData.investments.reduce((a,b)=>{ 
            return a + (b.percentage_profit/b.duration)
        },0)
        setInvestment(iTotal)
        setBalance(iTotal)
        setIsLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])
    return(
        <div>
             <p 
                 className="mg-small-20 mg-font-euclid 
                 mg-text-white mg-font-bold mg-text-center">
                 Available Balance
                 </p>
                 <p className="mg-small-14 mg-text-disabled mg-text-center">(Only available profits can be withdrawn while investment is ongoing)</p>
                 <p className="mg-small-35 mg-font-bold  mg-text-center mg-font-euclid mg-text-warning">${balance.toFixed(3)}</p>
                
                  <p className="mg-small-20 mg-font-euclid mg-text-white mg-font-bold">Statistics</p><br />
                  <div>
                  <p className="mg-text-grey mg-font-euclid ">Total Profits: <span className="mg-text-warning mg-font-euclid">${investmentsTotal.toFixed(3)}</span></p>
                  <Progress strokeColor={"#fcd535"} 
                      width={170}
                      trailColor="#0b0e11"
                      percent={(investmentsTotal/balance)*100}
                      format={percent=><p className="mg-text-warning mg-small-15"></p>}
                      />
                  </div><br />

                  <div>
                  <p className="mg-text-grey mg-font-euclid ">Refferal Bonus: <span className="mg-text-warning mg-font-euclid">${refferralsTotal}</span></p>
                  <Progress strokeColor={"#fcd535"} 
                      width={170}
                      trailColor="#0b0e11"
                      percent={(refferralsTotal/balance) * 100}
                      format={percent=><p className="mg-text-warning mg-small-15"></p>}
                      />
                  </div>

                  <div><br />
                  <p className="mg-text-grey mg-font-euclid ">Total Withdrawals: <span className="mg-text-warning mg-font-euclid">-${withdrawalTotal}</span></p>
                  <Progress strokeColor={"#fcd535"} 
                      width={170}
                      trailColor="#0b0e11"
                      percent={(withdrawalTotal/balance) * 100}
                      format={percent=><p className="mg-text-warning mg-small-15"></p>}
                      />
                  </div>
        </div>
    )
}