import { notification, Spin } from "antd";
import Link from "next/link";
import { useState } from "react";
import AccountContainer from "~/components/elements/account/AccountContainer";
import AccountLayout from "~/components/layouts/AccountLayout";
import User from "~/utils/User";
import validateFields from "~/utils/validate";

export default function LoginPage(){
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState("")
    const [username,setUserName] = useState("")
    const handleSubmit= async(e)=>{
    e.preventDefault();
    const emailErrors = validateFields([
        {inputType:"username",inputField:username}
    ])
    if(emailErrors.length !== 0){
        const emailError = emailErrors.find((err)=>err.field.toLowerCase() === "username")
        console.log(emailErrors)
        setError(emailError.error)
    }
    else{
        setError("")
        setIsLoading(true)
        const response = await User.forgotPassword({username})
        setIsLoading(false)
        console.log(response)
        if(response.status !== "success"){
            notification.error({
                className:"mg-bg-component",
                message:<h3 className="mg-text-white">{response.status}</h3>,
                description:<p className="mg-text-danger">{response.err}</p>
            })
        }else{
         window.location.assign(`/account/reset-password?reset-code=${response.reset_code}`)
        }
        
    }

    }
    return(
        <AccountLayout title={"Forgot Password"}>
           <div className="container">
           <AccountContainer Page={"Forgot Password"}>
               <form className="mg-account-form">
                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Username</label>
                      <div className="mg-input-field">
                          <input type="username"
                           value={username}
                           onChange={(e)=>setUserName(e.target.value)}
                           className="mg-text-warning"
                           placeholder="Enter Your Username" />
                      </div>
                      <p><small className="mg-text-danger">{error}</small></p>
                   </div>
                  <br />
                   {isLoading?
                    <button type="button" className="mg-submit-btn mg-bg-warning">
                        <Spin/>
                    </button>
                   :<button type="button" className="mg-submit-btn mg-bg-warning" onClick={handleSubmit}>Change Password</button>
                   }
               </form>
            </AccountContainer><br /><br />
           </div>
        </AccountLayout>
    )
}