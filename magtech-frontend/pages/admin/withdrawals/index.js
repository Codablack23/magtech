import AdminLayout from "~/components/layouts/AdminLayout";
import Admin from "~/utils/Admin";
import {Spin} from 'antd'
import {useEffect,useState} from 'react'

export default function AdminWithdrawalsPage(){
  const [withdrawals,setWithdrawals] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  
  async function getPayments(){
    setIsLoading(true)
    const apiData = await Admin.getWithdrawals()
    console.log(apiData)
    setWithdrawals(apiData.withdrawals)
    setIsLoading(false)
  }
  
  useEffect(() => {
    getPayments()
  }, [])
  
  return(
    <AdminLayout title={"Withdrawals"}>
      <br />
      <div className="row mg-vh-85">
        <div className="col-12 mg-bg-component mg-rounded">
        <p className="mg-small-18 mg-text-primary mg-font-bold">All Payments</p>
          {isLoading?
          <div className="mg-d-flex mg-justify-center mg-align-center mg-w-100 mg-min-vh-80">
             <Spin size="large"/>
          </div>:
          withdrawals.length > 0 ?
          withdrawals.map(p=>(
            <div className="mg-bg-dark mg-min-vh-10 mg-rounded mg-d-flex mg-justify-between mg-align-center" 
            style={{margin:"10px auto",padding:"10px"}}>
                <div>
                  <h2 className="mg-text-primary mg-font-euclid mg-font-bold mg-small-18 mg-small-md-14">${p.amount}</h2>
                  <p className="mg-text-grey mg-small-12 mg-w-80">{p.withdrawal_id}</p>
                </div>
                <div className="mg-font-euclid">
                   <p className="mg-text-grey mg-small-12">{new Date(p.createdAt).toDateString()}</p>
                   <p className="mg-text-grey mg-small-12">{p.email}</p>
                  </div>
                  <div>
                   <p className={`${p.status==="paid"?"mg-text-primary":"mg-text-danger"} mg-small-12`}>{p.status}</p>
                  </div>
            </div>
          ))
          :
          <div className="mg-d-flex mg-justify-center mg-align-center mg-w-100 mg-min-vh-80">
          <h2 className="mg-text-center mg-text-disabled mg-small-20">No Payments available</h2>
          </div>
          }
        </div>
      </div><br />
    </AdminLayout>
  )
}