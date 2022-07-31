import DashboardLayout from "~/components/layouts/DashboardLayout";
import {Spin } from "antd";
import Payments from "~/utils/Payment";
import DashboardBalance from "~/components/widgets/dashbaord/Balance";
import Investment from "~/components/widgets/dashbaord/Investment";
import { useEffect, useState } from "react";


const Payment =({payment})=>{
    const date = new Date(payment.createdAt)
    return(
    <li>
        <div className="">
            <p className="mg-text-grey mg-font-bold amount">${payment.amount}</p>
            <p className="mg-text-warning">{payment.description}</p>
        </div>
        <div>
        <p className="mg-text-grey">{date.toDateString()}</p>
        </div>
        <div>
            <p className="mg-btn-outline-warning">{payment.status}</p>
        </div>
    </li>
    )
}

export default function DashboardHome(){

    const [payments,setPayments] = useState([])
    const [investments,setInvestments] = useState([])
    const [isLoading,setIsLoading] = useState(false)

    async function getData(){
        setIsLoading(true)
        const paymentData =  await Payments.getPayments()
        const investmentData = await Payments.getInvestments()
        setPayments(paymentData.payments)
        setInvestments(()=>{
            const oneDay = 1000 * 60 * 60 * 24
            return investmentData.investments.filter(i=>{
                 const round = Math.round((new Date(i.expires) - new Date())/oneDay)
                return round > 0
            })
        })
        setIsLoading(false)
    }
    useEffect(() => {
       getData() 
    }, [])
    

    return(
        <DashboardLayout title={"Analytics"}>
         <div className="mg__dashboard-analytics">
            <div className="row" style={{marginTop:"20px"}}>
               <div className="col-7 col-md-12 mg-bg-component mg-rounded">
                   <heading className="mg-d-flex mg-justify-between">
                   <p className="mg-small-23 mg-font-euclid 
                      mg-text-white
                      mg-font-bold
                      mg-text-center
                      ">Pending Investments</p>
                    <p style={{margin:"0.7em 0.5em"}}>
                    {isLoading && (<Spin/>)}
                   </p>
                   </heading>
                    <div className="mg__pending-investments">                        
                     {investments.length > 0?
                     investments.map(investment=><Investment investment={investment}/>)
                     :<div className="mg-d-flex mg-justify-center mg-align-center mg-min-vh-35">
                      <p className="mg-text-disabled">No pending Investment</p>   
                     </div>}
                    </div>
                </div>

                <div className="col-5 col-md-12  mg-bg-component mg-rounded">
                  <DashboardBalance/>
                </div>
              
            </div>
            <div className="mg-min-vh-50 mg-bg-component mg-rounded" style={{marginTop:"20px"}}>
            <header className="mg-d-flex mg-justify-between">
             <p 
              className="mg-small-23 mg-font-euclid 
              mg-text-white mg-font-bold"
              style={{margin:"0.7em 0.5em"}}
              >
             Transactions
             </p>
             <p style={{margin:"0.7em 0.5em"}}>
                {isLoading && (<Spin/>)}
             </p>
            </header>
             <ul className="mg__payment-list">
               {payments.length > 0?
                 payments.map(payment=><Payment payment={payment}/>)
               :
                 <h2 className="mg-text-disabled mg-text-center">
                    You have not made any transaction
                </h2>}
             </ul>
            </div>
         </div>
        </DashboardLayout>
    )
}