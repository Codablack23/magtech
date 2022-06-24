import DashboardLayout from "~/components/layouts/DashboardLayout";
import { Progress } from "antd";
import DashboardBalance from "~/components/widgets/dashbaord/Balance";
import Investment from "~/components/widgets/dashbaord/Investment";
const payments =[
    "investment","withdrawals","bots","investments"
]

const Payments =({paymentType})=>{
    const date = new Date()
    return(
    <li>
        <div className="">
            <p className="mg-text-grey mg-font-bold amount">$300</p>
            <p className="mg-text-warning">{paymentType}</p>
        </div>
        <div>
        <p className="mg-text-grey">{date.toDateString()}</p>
        <p className="mg-text-grey">60/60 days</p>
        </div>
        <div>
            <p className="mg-btn-outline-warning">Paid</p>
        </div>
    </li>
    )
}
export default function DashboardHome(){
  
    return(
        <DashboardLayout title={"Analytics"}>
         <div className="mg__dashboard-analytics">
            <div className="row" style={{marginTop:"20px"}}>
               <div className="col-7 col-md-12 mg-bg-component mg-rounded">
               <p className="mg-small-23 mg-font-euclid 
                      mg-text-white
                      mg-font-bold
                      mg-text-center
                      ">Pending Investments</p>
                    <div className="mg__pending-investments">                        
                     <Investment/>
                    </div>
                </div>

                <div className="col-5 col-md-12  mg-bg-component mg-rounded">
                  <DashboardBalance/>
                </div>
              
            </div>
            <div className="mg-min-vh-50 mg-bg-component mg-rounded" style={{marginTop:"20px"}}>
            <p 
              className="mg-small-23 mg-font-euclid 
              mg-text-white mg-font-bold"
              style={{margin:"0.7em 0.5em"}}
              >
             Transactions
             </p>
             <ul className="mg__payment-list">
                {payments.map(payment=><Payments paymentType={payment}/>)}
             </ul>
            </div>
         </div>
        </DashboardLayout>
    )
}