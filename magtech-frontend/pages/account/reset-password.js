import { message, notification, Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";
import AccountContainer from "~/components/elements/account/AccountContainer";
import AccountLayout from "~/components/layouts/AccountLayout";
import User from "~/utils/User";
import validateFields from "~/utils/validate";

export default function RegisterPage(){
    const router = useRouter()
    const emailParams = router.query.email
    const [isPassShowing,setIsPassShowing] = useState(false)
    const [isConfirmPassShowing,setIsConfirmPassShowing] = useState(false)
    const [resetCode,setResetCode] = useState("")
    const [password,setPassword] = useState("")
    const [errors,setErrors] = useState({})
    const [confirmPassword,setConfirmPassword] = useState("")
    const [isLoading,setIsLoading] = useState(false)
 
    useEffect(() => {
        const code = router.asPath.slice(router.asPath.indexOf("=") + 1)
        const key = router.asPath.slice(
            router.asPath.indexOf("?") + 1,
            router.asPath.indexOf("=")
        )
        if(!(code && key === "reset-code")){
          window.location.assign("/account")
        }
        else{
            setResetCode(code)
        }
        message.info("This Link Expires After an Hour",5)
    }, [])
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
    async function handleSubmit(e){
        e.preventDefault();
        const fieldErrors = validateFields([
            {inputField:password,inputType:"password"},
            {inputField:confirmPassword,inputType:"password",inputName:"Confirm_Password"}
        ])
        const errObj = {}
        fieldErrors.forEach(err=>{
            errObj[err.field] = err.error
        })
        setErrors(errObj)
        if(fieldErrors.length === 0){
          if(password === confirmPassword){
            setIsLoading(true)
            const response = await User.resetPassword({
                reset_code:resetCode,
                new_password:password,
            })
            setIsLoading(false)
            console.log(response)
            if(response.status === "success"){
                notification.success({
                    message:<h3 className="mg-text-white">Success</h3>,
                    description:<p className="mg-text-white"><small>{response.message}, you will be redirected to the Login page shortly</small></p>,
                    className:"mg-bg-component"
                })    
                setTimeout(()=>{
                    window.location.assign("/account")
                },7000)
            }else{
                notification.error({
                    message:<h3 className="mg-text-white">Failed</h3>,
                    description:<p className="mg-text-danger"><small>{response.error}</small></p>,
                    className:"mg-bg-component"
                })  
            }
            
          }else{
            notification.error({
                message:<h3 className="mg-text-white">Password Error</h3>,
                description:<p className="mg-text-danger"><small>Passwords do not match</small></p>,
                className:"mg-bg-component"
            })
          }
        }
    }
    return(
        <AccountLayout title={"Reset Password"} pageType={"account"}>
          <AccountContainer Page={'Reset Password'}>
          <form action="" className="mg-account-form">
                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">New Password</label>
                      <div className="mg-input-field">
                          <input 
                          className="mg-text-warning"
                          type={!isPassShowing?"password":'text'} 
                          value={password}
                          onChange={(e)=>setPassword(e.target.value)}
                          />
                          <button 
                           type="button"
                           className="mg-input-action"
                           onClick={(e)=>handleShowPassword(e,"pass")}
                           >
                              <i className="bi bi-eye mg-text-warning"></i>
                          </button>
                      </div>
                      <p><small className="mg-text-danger">{errors.password}</small></p>
                   </div>
                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Re-type Password</label>
                      <div className="mg-input-field">
                          <input 
                          className="mg-text-warning"
                          type={!isConfirmPassShowing?"password":'text'} 
                          value={confirmPassword}
                           onChange={(e)=>setConfirmPassword(e.target.value)}
                          />
                          <button 
                           type="button"
                           className="mg-input-action"
                           
                           onClick={(e)=>handleShowPassword(e,"confirm")}
                           >
                              <i className="bi bi-eye mg-text-warning"></i>
                          </button>
                      </div>
                      <p><small className="mg-text-danger">{errors.confirm_password}</small></p>
                   </div>
                   <br />
                 {isLoading?
                 <button className="mg-submit-btn mg-bg-warning"><Spin/></button>
                 :<button className="mg-submit-btn mg-bg-warning" onClick={handleSubmit}>Reset Password</button>
                 }
               </form>
          </AccountContainer>
        </AccountLayout>
    )
}