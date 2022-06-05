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
        <AccountLayout title={"Sign Up"} pageType={"account"}>
          <AccountContainer Page={'Sign Up'}>
          <form action="" className="mg-account-form">
                  <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Name</label>
                      <div className="mg-input-field">
                          <input type="text" 
                          className="mg-text-warning"
                          />
                      </div>
                   </div>

                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Email</label>
                      <div className="mg-input-field">
                          <input type="email" 
                          className="mg-text-warning" 
                          />
                      </div>
                   </div>

                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Phone No</label>
                      <div className="mg-input-field">
                          <input type="phone"
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
                           onClick={(e)=>handleShowPassword(e,"pass")}
                           >
                              <i className="bi bi-eye mg-text-warning"></i>
                          </button>
                      </div>
                   </div>
                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Confirm Password</label>
                      <div className="mg-input-field">
                          <input 
                          type={!isConfirmPassShowing?"password":'text'} 
                          className="mg-text-warning"
                          />
                          <button 
                           type="button"
                           className="mg-input-action"
                           onClick={(e)=>handleShowPassword(e,"confirm")}
                           >
                              <i className="bi bi-eye mg-text-warning"></i>
                          </button>
                      </div>
                   </div>
                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Refferal Code</label>
                      <div className="mg-input-field">
                          <input type="text"
                          className="mg-text-warning"
                          />
                      </div>
                   </div>
                   <br />
                   <button className="mg-submit-btn mg-bg-warning">Submit</button>
               </form>
          </AccountContainer>
        </AccountLayout>
    )
}