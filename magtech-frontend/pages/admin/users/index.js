import AdminLayout from "~/components/layouts/AdminLayout";
import Admin from "~/utils/Admin";
import {Modal, notification, Spin} from 'antd'
import {useEffect,useState} from 'react'
import {AdminInvestment as Investment} from "~/components/widgets/dashbaord/Investment";


const User=({user:p,refs,w,i,payments})=>{
  console.log(payments)
  const {first_gen:firstGen,second_gen:secondGen}  = refs.find(ref=>ref.ref_code === p.ref_code)
  const i_total = i.filter(inv=>inv.username.toLowerCase() === p.username.toLowerCase())
  const p_total = payments.filter(inv=>inv.username.toLowerCase() === p.username.toLowerCase())
  const w_total = w.filter(inv=>inv.username.toLowerCase() === p.username.toLowerCase())
  const [isOpen,setIsOpen] = useState(false)

console.log(p.username)
 return (
 <div className="mg-bg-dark mg-min-vh-10 mg-rounded"
 style={{margin:"10px auto",padding:"10px"}}
 >
  <Modal 
  open={isOpen} 
  maskStyle={{backgroundColor:"#0B0E11"}} 
  onCancel={()=>setIsOpen(prev=>!prev)} 
  bodyStyle={{background:"#181a20"}} 
  maskClosable={false}
  closeIcon={<i className="bi bi-x-lg mg-text-grey"></i>} 
  footer={null}>
     <div>
       <header className="mg-text-center">
        <i className="bi bi-person-circle mg-small-50 mg-text-primary"></i>
       </header>
       <div className="">
          <div className="mg-text-grey">
            <div>
            <p style={{marginBottom:"8px"}}>No Of Investments: <b>{i_total.length}</b></p>
           <div 
           className="mg-bg-dark mg-rounded"
           style={{
            marginBottom:"8px",
            padding:"7px",
            maxHeight:"200px",
           }}
           >
           {i_total.length > 0
           ?i_total.map(inv=>(
            <Investment investment={inv}/>
           ))
           :<p className="mg-text-center mg-font-bold mg-text-disabled">No Investments yet</p>}
           </div>
            </div>
            <div>
            <p style={{marginBottom:"8px"}}>No Of Withdrawals: <b>{w_total.length}</b></p>
            <div 
           className="mg-bg-dark mg-rounded"
           style={{
            marginBottom:"8px",
            padding:"7px",
            maxHeight:"200px",
           }}
           >
           {w_total.length > 0
           ?w_total.map(p=>(
            <div className="mg-bg-dark mg-min-vh-10 mg-rounded mg-d-flex mg-justify-between mg-align-center" 
            style={{margin:"10px auto",padding:"10px"}}>
                <div>
                  <h2 className="mg-text-primary mg-font-euclid mg-font-bold mg-small-18 mg-small-md-14">${p.amount}</h2>
                  <p className="mg-text-grey mg-small-12 mg-w-80">{p.withdrawal_id}</p>
                  <p className="mg-text-grey mg-small-12">{new Date(p.createdAt).toDateString()}</p>
                </div>
                <div className="mg-font-euclid">
                  </div>
                  <div>
                   <p className={`${p.status==="paid"?"mg-text-primary":"mg-text-danger"} mg-small-12`}>{p.status}</p>
                  </div>
            </div>
          ))
           :<p className="mg-text-center mg-font-bold mg-text-disabled">No Withdrawals yet</p>}
           </div>
            </div>
            <div>
            <p style={{marginBottom:"8px"}}>No Of Payments: <b>{p_total.length}</b></p>
            <div 
           className="mg-bg-dark mg-rounded"
           style={{
            marginBottom:"8px",
            padding:"7px",
            maxHeight:"200px",
            overflow:"auto"
           }}
           >
           {p_total.length > 0
           ? p_total.map(p=>(
            <div key={p.id} className="mg-bg-dark mg-min-vh-10 mg-rounded mg-d-flex mg-justify-between mg-align-center" 
            style={{margin:"10px auto",padding:"10px"}}>
                <div>
                  <h2 className="mg-text-primary mg-font-euclid mg-font-bold mg-small-18 mg-small-md-14">${p.amount}</h2>
                  <p className="mg-text-grey mg-small-12 mg-w-80">{p.description}</p>
                  <p className="mg-text-grey mg-small-12">{new Date(p.createdAt).toDateString()}</p>
                </div>
                <div className="mg-font-euclid">
                  </div>
                  <div>
                   <p className={`${p.status==="paid"?"mg-text-primary":"mg-text-danger"} mg-small-12`}>{p.status}</p>
                  </div>
            </div>))
           :<p className="mg-text-center mg-font-bold mg-text-disabled">No Payments yet</p>}
           </div>   
            </div>
          </div>
       </div>
     </div>
  </Modal>
  <div className="mg-d-flex mg-justify-between mg-align-center">
      <div>
        <h2 className="mg-text-primary mg-font-euclid mg-font-bold mg-small-18 mg-small-md-14">Phone No: {p.phone}</h2>
        <p className="mg-text-grey mg-small-12">Name: <b>{p.name}</b></p>
        <p className="mg-text-disabled mg-small-12">Username: <b>{p.username}</b></p>
      </div>
        <div>
          <p className="mg-text-grey mg-small-12"><span className="mg-text-primary mg-small-12">joined</span>: {new Date(p.createdAt).toDateString()}</p>
        </div>
  </div>
  {(firstGen || secondGen)?(
    <div style={{borderTop:"1px solid #272E2D",marginTop:"15px"}}>
    <br />
  <h3 className="mg-text-grey mg-font-bold">Refferrals</h3>
  {firstGen?
  <div className="mg-font-euclid" style={{marginBlock:"10px"}}>
    <p className="mg-text-grey mg-small-12">{firstGen.name} (1st gen)</p>
    <p className="mg-text-grey mg-small-12">{firstGen.phone}</p>
  </div>
  :<p className="mg-text-grey mg-small-12">First Gen: N/A</p>}
  {secondGen?
  <div className="mg-font-euclid">
    <p className="mg-text-grey mg-small-12">{secondGen.name} (2nd gen)</p>
    <p className="mg-text-grey mg-small-12">{secondGen.phone}</p>
  </div>
  :<p className="mg-text-grey mg-small-12">Second Gen: N/A</p>}
  </div>
  ):<p className="mg-font-euclid mg-font-bold mg-text-grey">No Refferals Made Yet</p>}
  <br />
  <button onClick={()=>setIsOpen(true)} className="mg-btn-outline-primary mg-small-14">See Details</button>
 </div>
 )
}
export default function AdminUsersPage(){
const [users,setUsers] = useState([])
const [refs,setRefs] = useState([])
const [investments,setInvestments] = useState([])
const [withdrawals,setWithdrawals] = useState([])
const [payments,setPayments] = useState([])
const [isLoading,setIsLoading] = useState(false)

async function getPayments(){
  setIsLoading(true)
  try {
  const apiData = await Admin.getUsers()
  console.log(apiData)
  const sortedUsers = apiData.users.sort((a,b)=>{
    return (new Date(b.createdAt) - new Date(a.createdAt))
  })
  setUsers(sortedUsers)
  setRefs(apiData.refs)
  setInvestments(apiData.investments)
  setPayments(apiData.payments)
  setWithdrawals(apiData.withdrawals)
  setIsLoading(false)
  } catch (error) {
    notification.error({
      message:<h3>Failed</h3>,
      description:<p className="mg-text-err">An error occurred</p>
    }) 
 }
}

useEffect(() => {
  getPayments()
}, [])

  return(
    <AdminLayout title={"Users"}>
      <br />
      <div className="row mg-vh-85">
        <div className="col-12 mg-bg-component mg-rounded">
          <p className="mg-small-20 mg-text-primary mg-font-bold mg-font-euclid">All Users</p>
        {isLoading?
          <div className="mg-d-flex mg-justify-center mg-align-center mg-w-100 mg-min-vh-80">
             <Spin size="large"/>
          </div>:
          users.length > 0 ?
          users.map((p)=>
          <User 
          payments={payments}
          i={investments}
          w={withdrawals}
          user={p} 
          refs={refs} 
          />)
          :
          <div className="mg-d-flex mg-justify-center mg-align-center mg-w-100 mg-min-vh-80">
          <h2 className="mg-text-center mg-text-disabled mg-small-20">No Users Joined</h2>
          </div>
          }
        </div>
      </div><br />
    </AdminLayout>
  )
}
