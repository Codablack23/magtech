import { Progress } from "antd"
import { useState,useEffect } from "react"
import Payments from "~/utils/Payment"


export default function DashboardBalance(){
    const [balance,setBalance] = useState(0)
    const [investmentsTotal,setInvestment] = useState(0)
    const [refferralsTotal,setRefferral] = useState(0)
    const [all_funds,setFunds] = useState(0)
    const [isLoading,setIsLoading] = useState(false)
    const [withdrawalTotal,setWithdrawal] = useState(0)

    async function getData(){
        setIsLoading(true)
        const date = new Date()
        const aSecond = 1000 * 60 
        const investmentData = await Payments.getInvestments()
        const PaymentsData = await Payments.getPayments()
        const {withdrawals} = await Payments.getWithdrawals()
        const {refs} = await Payments.getRefs()
        const {bots} = await Payments.getBots()

        const p_total = PaymentsData.payments.filter(p=>p.status === "paid").reduce((total,p)=>(total +p.amount),0)
        const i_total =  investmentData.investments.reduce((a,b)=>(a + b.amount),0)
        const w_total =  withdrawals.filter(p=>p.status === "paid").reduce((a,b)=>(a + b.amount),0)
        const ref_total =  refs.reduce((a,b)=>(a + b.amount),0)
        const b_total = bots.reduce((a,b)=>(a + b.bot_price),0)
        const funds = p_total - (i_total + w_total + ref_total + b_total)
        const iTotal = investmentData.investments.reduce((a,b)=>{ 
            const expires = new Date(b.expires)
            const timeLeft = (expires - date) /(1000 * 60 * 60 * 24 )
            return a + ((b.amount * b.percentage_profit)/timeLeft)
        },0)
        setRefferral(ref_total)
        setWithdrawal(w_total)
        setInvestment(iTotal)
        setFunds(funds)
        setBalance((iTotal + funds) - w_total)
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
                  <div><br />
                  <p className="mg-text-grey mg-font-euclid ">Funds: <span className="mg-text-warning mg-font-euclid">-${all_funds}</span></p>
                  <Progress strokeColor={"#fcd535"} 
                      width={170}
                      trailColor="#0b0e11"
                      percent={(all_funds/balance) * 100}
                      format={percent=><p className="mg-text-warning mg-small-15"></p>}
                      />
                  </div>
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