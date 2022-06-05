import Link from "next/link";
import { useState } from "react";
import AccountContainer from "~/components/elements/account/AccountContainer";
import AccountLayout from "~/components/layouts/AccountLayout";

export default function RegisterPage(){
    const [isPassShowing,setIsPassShowing] = useState(false)
    const [isConfirmPassShowing,setIsConfirmPassShowing] = useState(false)

    const handleShowPassword=(e,field)=>{
        if(field==='confirm'){
            setIsConfirmPassShowing(prev=>!prev)
            e.target.classList.toggle('bi-eye')
            e.target.classList.toggle('bi-eye-slash')
        }
        else{
            setIsPassShowing(prev=>!prev)
            e.target.classList.toggle('bi-eye')
            e.target.classList.toggle('bi-eye-slash')
        }
      
    }
    return(
        <AccountLayout title={"Reset Password"} pageType={"account"}>
          <AccountContainer Page={'Reset Password'}>
          <form action="" className="mg-account-form">
                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Password</label>
                      <div className="mg-input-field">
                          <input 
                          className="mg-text-warning"
                          type={!isPassShowing?"password":'text'} />
                          <button 
                           type="button"
                           className="mg-input-action"
                           onClick={(e)=>handleShowPassword(e,"pass")}
                           >
                              <i className="bi bi-eye mg-text-warning"></i>
                          </button>
                      </div>
                   </div>
                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Re-type Password</label>
                      <div className="mg-input-field">
                          <input 
                          className="mg-text-warning"
                          type={!isConfirmPassShowing?"password":'text'} />
                          <button 
                           type="button"
                           className="mg-input-action"
                           onClick={(e)=>handleShowPassword(e,"confirm")}
                           >
                              <i className="bi bi-eye mg-text-warning"></i>
                          </button>
                      </div>
                   </div>
                   <br />
                   <button className="mg-submit-btn mg-bg-warning">Reset Password</button>
               </form>
          </AccountContainer>
        </AccountLayout>
    )
}