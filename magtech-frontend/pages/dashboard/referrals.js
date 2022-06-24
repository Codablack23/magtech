import DashboardLayout from "~/components/layouts/DashboardLayout";
import Investment from "~/components/widgets/dashbaord/Investment";
const payments =[
    "investment","withdrawals",
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
export default function DashoardReferralsPage(){
    return(
        <DashboardLayout title={"Refferrals"}>
         <div className="">
            <div className="row" style={{marginTop:"20px"}}>
                <div className="col-7 col-md-12 mg-min-vh-30 mg-bg-component mg-rounded mg-font-euclid">
                  <p className="mg-small-20 mg-text-white mg-font-bold"> Referral Link </p><br />
                  <div className="mg-input-field mg-input-field-disabled mg-text-grey">
                    <input type="text" className="mg-w-95" value={"https://magtech/qwertyuiopzasdxcfvgbnm"} readOnly/>
                  </div>
                  <button className="mg-btn-warning mg-text-dark" style={{margin:"1em 0"}}>Copy Link</button>
                </div>
                <div className="col-5 col-md-12 mg-text-center mg-center mg-min-vh-30 mg-bg-component mg-rounded mg-font-euclid  mg-font-bold">
                <p className="mg-small-20 mg-text-white"> Referral Bonus </p>
                <p className="mg-text-warning mg-small-35 mg-font-euclid mg-small-18">$10,200</p>
                </div>
            </div>
            <div className="mg-min-vh-50 mg-bg-component mg-rounded" style={{marginTop:"20px"}}>
            <p 
              className="mg-small-23 mg-font-euclid 
              mg-text-white mg-font-bold"
              style={{margin:"0.7em 0.5em"}}
              >
             Referrals
             </p>
             <ul className="mg__payment-list">
                {payments.map(payment=><Payments paymentType={payment}/>)}
             </ul>
            </div>
         </div>
        </DashboardLayout>
    )
}