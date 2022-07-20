import { notification, Spin } from "antd";
import Link from "next/link";
import { useContext, useState } from "react";
import AccountContainer from "~/components/elements/account/AccountContainer";
import AccountLayout from "~/components/layouts/AccountLayout";
import {AuthContext} from "~/context/auth/context";
import User from "~/utils/User";
import validateFields from "~/utils/validate";

export default function LoginPage(){
    const {dispatch} = useContext(AuthContext)

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errors,setErrors] = useState({})
    const [isLoading,setIsLoading] = useState(false)

    const [isPassShowing,setIsPassShowing] = useState(false)
    const handleShowPassword=(e)=>{
        setIsPassShowing(prev=>!prev)
        e.target.classList.toggle('bi-eye')
        e.target.classList.toggle('bi-eye-slash')
    }
    async function handleLogin(e){
        e.preventDefault()
     const fieldErrors = validateFields([
        {inputField:email,inputType:"email"},
        {inputField:password,inputType:"password"}
      ])
     const errObj = {}
     fieldErrors.forEach(err=>{
        errObj[err.field] = err.error
     })
     setErrors(errObj)
     if(fieldErrors.length === 0){
        setIsLoading(true)
        const response = await User.login({email,password})
        if(response.user){
            dispatch({type:"LOGIN_USER",payload:{user:response.user}})
            window.location.assign("/dashboard")
        }
        else{
            notification.error({
                message:<h3 className="mg-text-white">Login Failed</h3>,
                description:<p className="mg-text-danger">{response.err}</p>,
                className:"mg-bg-component"
                
            })
        }
        setIsLoading(false)
     }
    }
    return(
        <AccountLayout title={"Login"}>
           <div className="container">
           <AccountContainer Page={"Login"}>
               <form action="" className="mg-account-form" >
                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Email</label>
                      <div className="mg-input-field">
                          <input type="email"
                          value={email}
                          onChange={(e)=>setEmail(e.target.value)} 
                          className="mg-text-warning"
                          />
                      </div>
                   </div>
                   <p className="mg-text-danger mg-small-12">{errors.email}</p>

                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Password</label>
                      <div className="mg-input-field">
                          <input 
                          className="mg-text-warning"
                          value={password}
                          onChange = {(e)=>setPassword(e.target.value)}
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
                   <p className="mg-text-danger mg-small-12">{errors.password}</p>

                   <Link href={"/account/forgot-password"}>
                       <a className="mg-text-grey"><small>Forgot Password?</small></a>
                   </Link>
                   <br /><br />
                   
                   <button className="mg-submit-btn mg-bg-warning" type="submit" onClick={handleLogin}>
                    {isLoading?<Spin/>:"Submit"}
                   </button>
               </form>
            </AccountContainer>
           </div>
        </AccountLayout>
    )
}