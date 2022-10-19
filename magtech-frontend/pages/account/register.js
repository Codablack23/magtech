import { notification, Spin } from "antd";
import Link from "next/link";
import { useState,useContext,useEffect} from "react";
import AccountContainer from "~/components/elements/account/AccountContainer";
import AccountLayout from "~/components/layouts/AccountLayout";
import User from "~/utils/User";
import {AuthContext} from "~/context/auth/context";
import validateFields from "~/utils/validate";
import { useRouter } from "next/router";

export default function RegisterPage(){
    const {dispatch} = useContext(AuthContext)

    const router = useRouter()
    const ref_code = router.query.refcode;

    const [isPassShowing,setIsPassShowing] = useState(false)
    const [isConfirmPassShowing,setIsConfirmPassShowing] = useState(false)
    const [name,setName] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [refcode,setRefcode] = useState("")
    const [phone,setPhone] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [errors,setErrors] = useState({})
    const [isLoading,setIsLoading] = useState(false)

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
    async function handleSignUp(e){
        e.preventDefault()
        let refCodeErr = []
        const errObj = {}

        if(refcode !== "" && refcode !== " "){
            refCodeErr = validateFields([{inputField:refcode,inputType:"refcode"}])
        }
        
        const fieldErrors = validateFields([
            {inputField:name,inputType:"text",inputName:"Name"},
            {inputField:password,inputType:"password"},
            {inputField:username,inputType:"username"},
            {inputField:phone,inputType:"phone"},
            {inputField:confirmPassword,inputType:"username",inputName:"Confirm Password"}
        ])
        if(refCodeErr.length > 0){
            const [err] = refCodeErr
            errObj[err.field] = err.error
        }
        fieldErrors.forEach(err=>{
            errObj[err.field] = err.error
        })

        setErrors(errObj)

        if(fieldErrors.length === 0){
            setIsLoading(true)
           if(password !== confirmPassword){
            notification.error({
                className:"mg-bg-component",
                message:<h2 className="mg-text-white">Passwords Do Not Match</h2>,
                description:<p className="mg-text-danger">password and confirm password do not match </p>
            })
           }else{
            const response = await User.signUp(ref_code?
                ({refcode:ref_code,username,password,phone,name})
                :({username,password,phone,name})
            )
            if(response.status === "success"){
                dispatch({type:"SIGNUP_USER",payload:{user:response.user}})
                window.location.assign('/dashboard')
            } else{
                if(response.status === "field-error"){
                    notification.error({
                        className:"mg-bg-component",
                        message:<h2 className="mg-text-white">Login Error</h2>,
                        description:response.err.map(err=><p className="mg-text-danger">{err.field} {err.error}</p>)
                    })
                }
                else{
                    notification.error({
                        className:"mg-bg-component",
                        message:<h2 className="mg-text-white">Login Error</h2>,
                        description:<p className="mg-text-danger">{response.err}</p>
                    })
                }
            }
           }
           setIsLoading(false)
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
                          value={name}
                          onChange={(e)=>setName(e.target.value)}
                          className="mg-text-warning"
                          />
                      </div>
                   </div>
                  <p className="mg-text-danger mg-small-12">{errors.name}</p>

                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Username</label>
                      <div className="mg-input-field">
                          <input type="username" 
                          value={username}
                          onChange={(e)=>setUsername(e.target.value)}
                          className="mg-text-warning" 
                          />
                      </div>
                   </div>
                   <p className="mg-text-danger mg-small-12">{errors.username}</p>

                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Phone No</label>
                      <div className="mg-input-field">
                          <input type="number"
                            value={phone}
                            onChange={(e)=>setPhone(e.target.value)}
                          className="mg-text-warning"
                          />
                      </div>
                   </div>
                   <p className="mg-text-danger mg-small-12">{errors.phone_number}</p>

                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Password</label>
                      <div className="mg-input-field">
                          <input 
                          className="mg-text-warning"
                          value={password}
                          onChange={(e)=>setPassword(e.target.value)}
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
                   <p className="mg-text-danger mg-small-12">{errors.password}</p>

                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Confirm Password</label>
                      <div className="mg-input-field">
                          <input 
                           value={confirmPassword}
                           onChange={(e)=>setConfirmPassword(e.target.value)}
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
                   <p className="mg-text-danger mg-small-12">{errors.confirm_password}</p>
                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Refferal Code</label>
                      <div className="mg-input-field">
                          <input type="text"
                          value={ref_code?ref_code:ref_code}
                          onChange={(e)=>setRefcode(e.target.value)}
                          readOnly={ref_code?true:false}
                          className="mg-text-warning"
                          />
                      </div>
                   </div>
                   <p className="mg-text-danger mg-small-12">{errors.ref_code}</p>
                   <br />
                   {
                    isLoading?<button className="mg-submit-btn mg-bg-warning" type="button"><Spin/></button>
                    :<button className="mg-submit-btn mg-bg-warning" onClick={handleSignUp}>Submit</button>
                   }
               </form>
          </AccountContainer>
        </AccountLayout>
    )
}