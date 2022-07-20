import { notification, Spin } from "antd";
import Head from "next/head";
import { useState } from "react";
import Admin from "~/utils/Admin";
import validateFields from "~/utils/validate";

export default function AdminLoginPage(){
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [errors,setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    
    async function handleLogin(e){
      e.preventDefault()
      const fieldErrors = validateFields([
        {inputField:username,inputType:"username"},
        {inputField:password,inputType:"password"}
      ])
      const errObj = {}
      fieldErrors.forEach(err=>{
        errObj[err.field]=err.error
       })
       setErrors(errObj)

      if(fieldErrors.length === 0){
        setIsLoading(true)
         const result = await Admin.loginAdmin({username,password})
         console.log(result)
         if(result.admin){
            window.location.assign("/admin")
         }
         else{
            notification.error({
                className:'mg-bg-component',
                message:<h2 className="mg-text-white">Login Failed</h2>,
                description:<p className="mg-text-danger">{result.error}</p>
                
            })
         }
        setIsLoading(false)
      }

    }
    return(
      <div className="mg-layout-default">
       <Head>
        <title>Admin</title>
       </Head>
        
        <form action="" className="mg__admin-form mg-bg-component">
            <h1 className="mg-text-center mg-text-primary">Administrator</h1><br /><br />

            <div className="input-group">
                <label htmlFor="Username">Username</label>
                <input type="text"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                />
            </div>
            <p className="mg-text-danger mg-small-12">{errors.username}</p>
            <br />
            <div className="input-group">
                <label htmlFor="Username">Password</label>
                <div className="input-field"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                >
                <input type="password" />
                </div>
            </div>
            <p className="mg-text-danger mg-small-12">{errors.password}</p><br />

            {isLoading?
              <button className="mg-btn-primary mg-w-100" type="button"><Spin/></button>
            :
              <button className="mg-btn-primary mg-w-100" onClick={handleLogin}>Login</button>
            }
        </form>
      </div>
    )
}