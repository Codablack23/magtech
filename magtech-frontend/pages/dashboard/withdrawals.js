import Payment from "~/components/elements/dashboard/Payment";
import WithdrawalForm from "~/components/elements/dashboard/WithdrawalForm";
import DashboardLayout from "~/components/layouts/DashboardLayout";
import { Progress } from "antd";

export default function DashoardWithDrawalPage(){
    return(
        <DashboardLayout title={"Withdrawals"}>
         <div className="">
            <div className="row" style={{marginTop:"20px"}}>
                <div className="col-6 col-md-12 mg-min-vh-35 mg-bg-component mg-rounded">
                 <p 
                 className="mg-small-20 mg-font-euclid 
                 mg-text-white mg-font-bold mg-text-center">
                 Available Balance
                 </p>
                 <p className="mg-small-14 mg-text-disabled mg-text-center">(Only available profits can be withdrawn while investment is ongoing)</p>
                 <p className="mg-small-35 mg-font-bold  mg-text-center mg-font-euclid mg-text-warning">$123,544.00</p>
                
                  <p className="mg-small-20 mg-font-euclid mg-text-white mg-font-bold">Statistics</p><br />
                  <div>
                  <p className="mg-text-grey mg-font-euclid ">Total Profits: <span className="mg-text-warning mg-font-euclid">$110000.00</span></p>
                  <Progress strokeColor={"#fcd535"} 
                      width={170}
                      trailColor="#0b0e11"
                      percent={70}
                      format={percent=><p className="mg-text-warning mg-small-15"></p>}
                      />
                  </div><br />

                  <div>
                  <p className="mg-text-grey mg-font-euclid ">Refferal Bonus: <span className="mg-text-warning mg-font-euclid">$12301.00</span></p>
                  <Progress strokeColor={"#fcd535"} 
                      width={170}
                      trailColor="#0b0e11"
                      percent={35}
                      format={percent=><p className="mg-text-warning mg-small-15"></p>}
                      />
                  </div>

                  <div><br />
                  <p className="mg-text-grey mg-font-euclid ">Total Withdrawals: <span className="mg-text-warning mg-font-euclid">-$5253.00</span></p>
                  <Progress strokeColor={"#fcd535"} 
                      width={170}
                      trailColor="#0b0e11"
                      percent={-15}
                      format={percent=><p className="mg-text-warning mg-small-15"></p>}
                      />
                  </div>
                </div>

                <div className="col-6 col-md-12 mg-min-vh-30 mg-bg-component mg-rounded">
                 <p 
                  className="mg-small-20 mg-font-euclid 
                  mg-text-warning mg-font-bold">
                  Request withdrawal
                 </p><br />
                <WithdrawalForm/>
                </div>
            </div>

            <div className="mg-min-vh-50 mg-bg-component mg-rounded" style={{marginTop:"20px"}}>
            <p 
              className="mg-small-23 mg-font-euclid 
              mg-text-white mg-font-bold mg-text-center">
              Withdrawals
             </p>
             <ul className="mg__payment-list">
                <Payment/>
             </ul>
            </div>
         </div>
        </DashboardLayout>
    )
}