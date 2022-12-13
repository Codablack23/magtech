import { useState } from "react";
import AdminLayout from "~/components/layouts/AdminLayout";
import validateFields from "~/utils/validate";
import Admin from "~/utils/Admin";
import {Spin,notification} from 'antd'

export default function AdminSupportPage(){
    const [oldPassword,setOldPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [errors,setErrors] = useState({})
    const [isLoading,setIsLoading] = useState(false)

    const handleSubmit=async(e)=>{
     e.preventDefault()
     const fieldErrors = validateFields([
       {inputField:oldPassword,inputType:"password",inputName:"oldPassword"},
       {inputField:newPassword,inputType:"password",inputName:"newPassword"},
       {inputField:confirmPassword,inputType:"password",inputName:"confirmPassword"}
     ])
     const errObj = {}
     fieldErrors.forEach(err=>{
       errObj[err.field]=err.error
      })
      setErrors(errObj)

     if(fieldErrors.length === 0){
        if(confirmPassword === newPassword){
            setIsLoading(true)
            const result = await Admin.changePassword({
                old_password:oldPassword,
                new_password:newPassword
            })
            console.log(result)
            if(result.status === "success"){
                notification.success({
                    className:'mg-bg-component',
                    message:<h2 className="mg-text-white">Success</h2>,
                    description:<p className="mg-text-white">{result.message}</p>
                    
                })
                setTimeout(()=>{
                    window.location.assign("/admin")
                },5000)
            }
            else{
               notification.error({
                   className:'mg-bg-component',
                   message:<h2 className="mg-text-white">Failed</h2>,
                   description:<p className="mg-text-danger">{result.err}</p>
                   
               })
            }
           setIsLoading(false)
        }
        else{
            notification.error({
                className:'mg-bg-component',
                message:<h2 className="mg-text-white">Passwords Error</h2>,
                description:<p className="mg-text-danger">passwords do no match</p>
                
            })
        }
      }
    }
  return(
    <AdminLayout title={"Change Password"}>
      <br />
        <div className="mg-bg-component mg-rounded" style={{padding:'1em',marginInline:"auto",maxWidth:500}}>
           <h3 className="mg-text-primary mg-font-bold mg-text-center">Change Password</h3>
           <form action="" className="mg__admin-form mg-bg-component">
            <div className="input-group">
                <label htmlFor="Username">Old Password</label>
                <input type="password"
                value={oldPassword}
                onChange={(e)=>setOldPassword(e.target.value)}
                />
            </div>
            <p className="mg-text-danger mg-small-12">{errors.oldpassword}</p>
            <br />
            <div className="input-group">
                <label htmlFor="Username">New Password</label>
                <div className="input-field"
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                >
                <input type="password" />
                </div>
            </div>
            <p className="mg-text-danger mg-small-12">{errors.newpassword}</p><br />
            <div className="input-group">
                <label htmlFor="Username">Confirm Password</label>
                <div className="input-field"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                >
                <input type="password" />
                </div>
            </div>
            <p className="mg-text-danger mg-small-12">{errors.confirmpassword}</p><br />

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