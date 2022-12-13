import { useState } from "react";
import AdminLayout from "~/components/layouts/AdminLayout";
import validateFields from "~/utils/validate";
import Admin from "~/utils/Admin";
import {Spin,notification} from 'antd'

export default function AdminSupportPage(){
    const [username,setUsername] = useState("")
    const [errors,setErrors] = useState({})
    const [isLoading,setIsLoading] = useState(false)

    const handleSubmit=async(e)=>{
     e.preventDefault()
     const fieldErrors = validateFields([
       {inputField:username,inputType:"username",inputName:"username"},
     ])
     const errObj = {}
     fieldErrors.forEach(err=>{
       errObj[err.field]=err.error
      })
      setErrors(errObj)

     if(fieldErrors.length === 0){
            setIsLoading(true)
            const result = await Admin.addAdmin({username})
            setIsLoading(false)
            if(result.status === "success"){
                notification.success({
                    className:'mg-bg-component',
                    message:<h2 className="mg-text-white">Success</h2>,
                    closeIcon:<i className="bi bi-x-lg mg-text-white"></i>,
                    duration:null,
                    description:<p className="mg-text-white mg-small-12">{result.message}, Your password is '<span className="mg-font-bold">{result.password}</span>' Please do not share this with anyone</p>
                })
            }
            else{
                notification.error({
                    className:'mg-bg-component',
                    message:<h2 className="mg-text-white">Failed</h2>,
                    description:<p className="mg-text-danger">{result.err}</p>                    
                })
            }
      }
    }
  return(
    <AdminLayout title={"Change Password"}>
      <br />
        <div className="mg-bg-component mg-rounded" style={{padding:'1em',marginInline:"auto",maxWidth:500}}>
           <h3 className="mg-text-primary mg-font-bold mg-text-center">Add Admin</h3>
           <form action="" className="mg__admin-form mg-bg-component">
            <div className="input-group">
                <label htmlFor="Username">Username</label>
                <input type="text"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                />
            </div>
            <p className="mg-text-danger mg-small-12">{errors.username}</p>
            <br />
            {isLoading?
              <button className="mg-btn-primary mg-w-100" type="button"><Spin/></button>
            :
              <button className="mg-btn-primary mg-w-100" type="button" onClick={handleSubmit}>Submit </button>
            }
        </form>
        </div>
    </AdminLayout>
  )
}