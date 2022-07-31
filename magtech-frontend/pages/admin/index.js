import { Progress } from "antd";
import { useEffect, useState } from "react";
import AdminLayout from "~/components/layouts/AdminLayout";
import Admin from "~/utils/Admin";

export default function AdminHomePage(){
  const [stats,setStats] = useState({
    payments:[],
    users:[],
    withdrawals:[]
  })
  const [total,setTotal] = useState({
    payments:0,
    withdrawals:0,
    investments:0
  })

  async function getStats(){
    try {
      const {payments} = await Admin.getPayments()
      const {users} = await Admin.getUsers()
      const {withdrawals} = await Admin.getWithdrawals()
      const  {investments}   = await Admin.getInvestments()

      const p_total = payments.filter(p=>p.status === "paid").reduce((init,payment)=>{
            return init + payment.amount
      },0)
      const i_total = investments.reduce((init,payment)=>{
        return init + payment.amount
      },0)
      const w_total = withdrawals.filter(w=>w.status === "paid").reduce((init,payment)=>{
        return init + payment.amount
      },0)

      setStats(prev=>{
        return {...prev,
          payments,
          users,
          withdrawals}
      })
      setTotal(prev=>{
        return {
          ...prev,
          payments:p_total + w_total,
          withdrawals:w_total,
          investments:i_total
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getStats()
  }, [])
  return(
    <AdminLayout title={"Stats"}>
      <div className="row mg-min-vh-25 mg-bg-component mg-rounded mg-text-center">
           <div className="col-4 col-sm-12">
              <h3 className="mg-font-euclid mg-font-bold mg-text-primary mg-small-40">{stats.payments.length}</h3>
              <p className="mg-text-grey">Total Payments</p>
            </div>
            <div className="col-4 col-sm-12">
            <h3 className="mg-font-euclid mg-font-bold mg-text-primary mg-small-40">{stats.withdrawals.length}</h3>
            <p className="mg-text-grey">Total Withdrawals</p>
            </div>
            <div className="col-4 col-sm-12">
            <h3 className="mg-font-euclid mg-font-bold mg-text-primary mg-small-40">{stats.users.length}</h3>
            <p className="mg-text-grey">Total Users</p>
        </div>
      </div><br />
      <div className="row">
        <div className="col-6 col-sm-12 mg-bg-component mg-min-vh-25  mg-rounded">
        <p className="mg-text-grey">Payments</p>
        <p className="mg-text-disabled">Total amount of successful payments made</p>
        <h3 className="mg-font-euclid mg-font-bold mg-text-primary mg-small-40">${total.payments}</h3>
        <Progress 
        percent={100}
        trailColor={'#0B0E11'}
        format={(p)=><p className="mg-text-primary">{p.toFixed(2)}%</p>}
        type="dashboard"
        strokeColor={"#32DBC6"}
        />
        </div>
        <div className="col-6 col-sm-12 mg-bg-component mg-min-vh-25  mg-rounded">
        <p className="mg-text-grey">Investments</p>
        <p className="mg-text-disabled">Total amount of successful investments made</p>
        <h3 className="mg-font-euclid mg-font-bold mg-text-primary mg-small-40">${total.investments}</h3>
        <Progress 
        percent={(total.investments/total.payments)*100}
        trailColor={'#0B0E11'}
        type="dashboard"
        format={(p)=><p className="mg-text-primary">{p.toFixed(2)}%</p>}
        strokeColor={"#32DBC6"}
        />
        </div>
      </div><br />
      <div className="row mg-min-vh-25">
        <div className="col-6 col-sm-12 mg-bg-component mg-rounded">
        <p className="mg-text-grey">Withdrawals</p>
        <p className="mg-text-disabled">Total amount of successful withdrawals made</p>
        <h3 className="mg-font-euclid mg-font-bold mg-text-primary mg-small-40">-${total.withdrawals}</h3>
        <Progress 
        percent={((total.withdrawals)/total.payments)*100}
        trailColor={'#0B0E11'}
        format={(p)=><p className="mg-text-primary">{p.toFixed(2)}%</p>}
        type="dashboard"
        strokeColor={"#32DBC6"}
        />
        </div>
      </div><br />
    </AdminLayout>
  )
}