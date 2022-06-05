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
        <AccountLayout title={"Login"}>
           <div className="container">
           <AccountContainer Page={"Login"}>
               <form action="" className="mg-account-form">
                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Email</label>
                      <div className="mg-input-field">
                          <input type="email" 
                          className="mg-text-warning"
                          />
                      </div>
                   </div>
                  
                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Password</label>
                      <div className="mg-input-field">
                          <input 
                          className="mg-text-warning"
                          type={!isPassShowing?"password":'text'} />
                          <button 
                           type="button"
                           className="mg-input-action"
                           onClick={handleShowPassword}
                           >
                              <i className="bi bi-eye mg-text-warning"></i>
                          </button>
                      </div>
                   </div>
                   <Link href={"/account/forgot-password"}>
                       <a className="mg-text-grey"><small>Forgot Password?</small></a>
                   </Link>
                   <br /><br />
                   <button className="mg-submit-btn mg-bg-warning">Submit</button>
               </form>
            </AccountContainer>
           </div>
        </AccountLayout>
    )
}