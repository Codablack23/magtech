import Link from "next/link";
import { useState } from "react";
import AccountContainer from "~/components/elements/account/AccountContainer";
import AccountLayout from "~/components/layouts/AccountLayout";

export default function LoginPage(){
    const [isPassShowing,setIsPassShowing] = useState(false)
    const handleShowPassword=(e)=>{
        setIsPassShowing(prev=>!prev)
        e.target.classList.toggle('bi-eye')
        e.target.classList.toggle('bi-eye-slash')
    }
    return(
        <AccountLayout title={"Forgot Password"}>
           <div className="container">
           <AccountContainer Page={"Forgot Password"}>
               <form action="/account/reset-password" className="mg-account-form">
                   <p className="mg-text-grey mg-text-center">
                        <small>A Reset Password Link Will Be Sent to Your Email</small>
                    </p>
                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Email</label>
                      <div className="mg-input-field">
                          <input type="email"
                           className="mg-text-warning"
                           placeholder="Enter Your Email" />
                      </div>
                   </div>
                  <br />
                   <button className="mg-submit-btn mg-bg-warning">Change Password</button>
               </form>
            </AccountContainer><br /><br />
           </div>
        </AccountLayout>
    )
}