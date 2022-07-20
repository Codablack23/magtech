import AdminLayout from "~/components/layouts/AdminLayout";
import Admin from "~/utils/Admin";
import {Spin} from 'antd'
import {useEffect,useState} from 'react'

export default function AdminUsersPage(){
  const [users,setUsers] = useState([])
const [isLoading,setIsLoading] = useState(false)

async function getPayments(){
  setIsLoading(true)
  const apiData = await Admin.getUsers()
  console.log(apiData)
  setUsers(apiData.users)
  setIsLoading(false)
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
          users.map(p=>(
            <div className="mg-bg-dark mg-min-vh-10 mg-rounded mg-d-flex mg-justify-between mg-align-center" 
            style={{margin:"10px auto",padding:"10px"}}>
                <div>
                  <h2 className="mg-text-primary mg-font-euclid mg-font-bold mg-small-18 mg-small-md-14">{p.email}</h2>
                  <p className="mg-text-grey mg-small-12">{p.name}</p>
                  <p className="mg-text-disabled mg-small-12">{p.phone}</p>
                </div>
                <div className="mg-font-euclid">
                 
                  </div>
                  <div>
                    <p className="mg-text-grey mg-small-12"><span className="mg-text-primary mg-small-12">joined</span>: {new Date(p.createdAt).toDateString()}</p>
                  </div>
            </div>
          ))
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