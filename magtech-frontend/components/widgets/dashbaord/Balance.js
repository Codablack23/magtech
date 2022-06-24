import { Progress } from "antd"

export default function DashboardBalance(){
    return(
        <div>
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
    )
}