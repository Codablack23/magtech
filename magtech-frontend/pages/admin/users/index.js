import AdminLayout from "~/components/layouts/AdminLayout";
import Admin from "~/utils/Admin";
import {notification, Spin} from 'antd'
import {useEffect,useState} from 'react'


const User=({user:p,refs,users})=>{
  const allUserRefs = refs.filter(ref=>ref.ref_code === p.ref_code)
  const firstGen = users.find(({username})=>(
    allUserRefs.find(({first_gen})=>first_gen === username)
  ));
  const secondGen = users.find(({username})=>(
    allUserRefs.find(({second_gen})=>second_gen === username)
  ));

  console.log({
    firstGen,
    secondGen
  })
 return (
 <div className="mg-bg-dark mg-min-vh-10 mg-rounded"
 style={{margin:"10px auto",padding:"10px"}}
 >
  <div className="mg-d-flex mg-justify-between mg-align-center">
      <div>
        <h2 className="mg-text-primary mg-font-euclid mg-font-bold mg-small-18 mg-small-md-14">{p.phone}</h2>
        <p className="mg-text-grey mg-small-12">{p.name}</p>
        <p className="mg-text-disabled mg-small-12">{p.username}</p>
      </div>
        <div>
          <p className="mg-text-grey mg-small-12"><span className="mg-text-primary mg-small-12">joined</span>: {new Date(p.createdAt).toDateString()}</p>
        </div>
  </div>
  {(firstGen && secondGen)?(
    <div style={{borderTop:"1px solid #272E2D",marginTop:"15px"}}>
    <br />
  <h3 className="mg-text-grey mg-font-bold">Refferrals</h3>
  {firstGen?
  <div className="mg-font-euclid" style={{marginBlock:"10px"}}>
    <p className="mg-text-grey mg-small-12">{firstGen.name} (1st gen)</p>
    <p className="mg-text-grey mg-small-12">{firstGen.phone}</p>
  </div>
  :null}
  {secondGen?
  <div className="mg-font-euclid">
    <p className="mg-text-grey mg-small-12">{secondGen.name} (2nd gen)</p>
    <p className="mg-text-grey mg-small-12">{secondGen.phone}</p>
  </div>
  :null}
  </div>
  ):null}
 </div>
 )
}
export default function AdminUsersPage(){
const [users,setUsers] = useState([])
const [refs,setRefs] = useState([])
const [isLoading,setIsLoading] = useState(false)

async function getPayments(){
  setIsLoading(true)
  try {
  const apiData = await Admin.getUsers()
  const sortedUsers = apiData.users.sort((a,b)=>{
    return (new Date(b.createdAt) - new Date(a.createdAt))
  })
  setUsers(sortedUsers)
  setRefs(apiData.refs)
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
          users.map((p)=><User user={p} refs={refs} users={users}/>)
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
