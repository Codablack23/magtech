import { useContext, useState } from "react";
import WithdrawalDetails from "~/components/elements/dashboard/withdrawalDetails";
import DashboardLayout from "~/components/layouts/DashboardLayout";
import { Modal } from "~/components/widgets/global/Modal";
import {getConfig} from '~/utils/flutterwave'
import { notification, Spin,message } from "antd";
import Payments from "~/utils/Payment";
import {useFlutterwave,closePaymentModal} from 'flutterwave-react-v3'
import { AuthContext } from "~/context/auth/context";
import User from "~/utils/User";
import validateFields from "~/utils/validate";
import { RateContext } from "~/context/payments/rateContext";
import { useCrypto } from "~/utils/customhooks/useCrypo";

function ChangePasswordForm({closeModal}){
    const [password,setPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [confirmNewPassword,setConfirmPassword] = useState("")
    const [errors,setErrors] = useState({})
    const [isLoading,setIsLoading] = useState(false)
    async function handleSubmit(e){
        e.preventDefault()
        const field_errors = validateFields([
            {inputField:password,inputType:"password",inputName:"Password"},
            {inputField:newPassword,inputType:"password",inputName:"New_Password"},
            {inputField:confirmNewPassword,inputType:"password",inputName:"Confirm_Password"}

        ])
      
        const errObj = {}
        field_errors.forEach(err=>{
            errObj[err.field] = err.error
        })
        setErrors(errObj)
        if(field_errors.length === 0){
          if(newPassword === confirmNewPassword){
            setIsLoading(true)
            const response = await User.changePassword({
                password,
                new_password:newPassword
            })
            setIsLoading(false)
            closeModal()
            console.log(response)
            if(response.status === "success"){
                notification.success({
                    message:<h3 className="mg-text-white">Success</h3>,
                    description:<p className="mg-small-14 mg-text-primary">{response.message}</p>,
                    className:"mg-bg-component"
                  })
            }
            else{
                notification.error({
                    message:<h3 className="mg-text-white">{response.status}</h3>,
                    description:<p className="mg-small-14 mg-text-danger">{response.err}</p>,
                    className:"mg-bg-component"
                  })
            }
          }else{
            notification.error({
              message:<h3 className="mg-text-white">Password Error</h3>,
              description:<p className="mg-small-14 mg-text-danger">New Password and Confirm Password do not match</p>,
              className:"mg-bg-component"
            })
          }
        }
    }
    return(
        <form style={{padding:"10px"}}>
        <br />
        <div className="mg-input-group">
            <label htmlFor="" className="mg-text-grey">Old Password</label>
            <div className="mg-input-field mg-input-field-disabled">
                <input 
                className="mg-w-100 mg-text-grey" 
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                name=""/>
            </div>
        </div>
        <p className="mg-text-danger mg-small-13">{errors.password}</p>
        <div className="mg-input-group">
            <label htmlFor="" className="mg-text-grey">New Password</label>
            <div className="mg-input-field mg-input-field-disabled">
                <input 
                className="mg-w-100  mg-text-grey" 
                type="password"
                name=""
                value={newPassword} 
                onChange={(e)=>setNewPassword(e.target.value)}
                 />
            </div>
        </div>
        <p className="mg-text-danger mg-small-13">{errors.new_password}</p>
        <div className="mg-input-group">
        <label htmlFor="" className="mg-text-grey">Confirm New Password</label>
            <div className="mg-input-field mg-input-field-disabled">
                <input 
                className="mg-w-100  mg-text-grey"
                type="password"
                name="" 
                value={confirmNewPassword} 
                onChange={(e)=>setConfirmPassword(e.target.value)}
                />
            </div>
        </div>
        <p className="mg-text-danger mg-small-13">{errors.confirm_password}</p>
        <br />
       {isLoading?
        <button className="mg-btn-warning mg-w-100"><Spin/></button>
       :<button className="mg-btn-warning mg-w-100" onClick={handleSubmit}>Change Password</button>
       }
     </form>
    )
}

function FundAccountForm({closeModal}){
    const {authState} = useContext(AuthContext)
    const [pID,setPID] = useState(null)
    const {paymentRates} = useContext(RateContext)
    const [amount,setAmount] = useState(0)
    const [isLoading,setIsLoading] = useState(false)

    const {user} = authState

    const showPaymentModal = useFlutterwave(getConfig({
        amount:amount * paymentRates.USD_NGN,
        email:"codablack24@gmail.com",
        description:"Payment for investment Bot"
    }))
    const startPayment = useCrypto({
        onClose:async()=>{
            await Payments.deletePayment(pID)
            closeModal()
            message.info("Payment Was Cancelled")
        },
        async onSuccess(response){
            const paymentStatus = await Payments.completePayment(payment_id)
            closeModal()
            if(paymentStatus.status === "Success"){
              notification.success({
               message:<h2 className="mg-text-white">{paymentStatus.status}</h2>,
               description:<p className="mg-text-primary">{paymentStatus.message}</p>,
               className:"mg-bg-dark"
            })
           }else {
            notification.error({
                message:<h2 className="mg-text-white">Payment Error</h2>,
                description:<p className="mg-text-danger">Payment couldn't be completed please try again</p>,
                className:"mg-bg-component"
            })
           }
        },
        async onError(response){
            await Payments.deletePayment(pID)
            console.log(response)
            closeModal()
        },
        amount:parseFloat(amount) + 1,
        name:user.name,
        product_name:"Funding"
    })
     const payWithCrypto =async()=>{
        if(amount > 9){
            const payment = await Payments.startPayment({
                amount:amount,
                description:"Payment for investment Bot"
            })
            if(payment.payment_id){
                setPID(payment.payment_id)
                startPayment()
            }else{
                notification.error({
                    message:<h2 className="mg-text-white">Payment Error</h2>,
                    description:<p className="mg-text-danger">there might have been an error with server please try again later</p>,
                    className:"mg-bg-component"
                })
            }
        }
        else{
            notification.error({
                message:<h2 className="mg-text-white">Invalid Amount</h2>,
                description:<p className="mg-text-danger">Please your amount should atleast be 10 USD</p>,
                className:"mg-bg-component"
            })
        }
       
     }


    async function flutterwaveCallback(res,payment_id){
        if(res.status === "successful"){
            const paymentStatus = await Payments.completePayment(payment_id)
            if(paymentStatus.status === "Success"){
              notification.success({
               message:<h2 className="mg-text-white">{paymentStatus.status}</h2>,
               description:<p className="mg-text-primary">{paymentStatus.message}</p>,
               className:"mg-bg-dark"
            })
            }else {
                notification.error({
                    message:<h2 className="mg-text-white">Payment Error</h2>,
                    description:<p className="mg-text-danger">Payment couldn't be completed please try again</p>,
                    className:"mg-bg-component"
                })
          
            }
       }
       closePaymentModal()
      }
    
    async function fundAccount(e){
        e.preventDefault()
        setIsLoading(true)
        
        if(amount>=5){

            const payment = await Payments.startPayment({amount,description:"Payment for investment Bot"})
            setIsLoading(false)
            closeModal()
            if(payment.payment_id){
                closeModal()
                showPaymentModal({
                 callback:(res)=>flutterwaveCallback(res,payment.payment_id),
                 onClose:async ()=>{
                    await Payments.deletePayment(payment.payment_id)
                 }
                })
            }else{
                notification.error({
                  message:<h2 className="mg-text-white">Payment Error</h2>,
                  description:<p className="mg-text-danger">there might have been an error with server please try again later</p>,
                  className:"mg-bg-component"
              })
            }
        }
        else{
            setIsLoading(false)
            closeModal()
            notification.error({
                message:<h2 className="mg-text-white">Invalid Amount</h2>,
                description:<p className="mg-text-danger">Amount Must be $5 and above </p>,
                className:"mg-bg-component"
            })  
        }
       
    }
    return(
    <form style={{padding:"10px"}}>
    <div className="mg-input-group">
        <h2 className="mg-text-grey mg-text-center mg-font-euclid">
            Exchange rate for 1USD is at NGN{paymentRates.USD_NGN} 
        </h2> 
        <label htmlFor="" className="mg-text-grey">Amount</label>
        <div className="mg-input-field mg-input-field-disabled">
            <input className="mg-w-100 mg-text-grey"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
            type="number"/>
        </div>
    </div>
    {isLoading?
    <button className="mg-btn-warning mg-w-100"><Spin/></button>
   :<button className="mg-btn-warning mg-w-100" onClick={fundAccount}>Pay With Flutterwave</button>
   }
   <br />
     {isLoading?
    <button className="mg-btn-warning mg-w-100"><Spin/></button>
   :<button className="mg-btn-outline-warning mg-w-100" type="button" onClick={payWithCrypto}>Pay With Crypto</button>
   }
 </form>
    )
}

export default function DashoardSettingsPage(){
    const [loadingPassChange,setLoadingPassChange] = useState(false)
    const [isPassChangeModalOpen,setIsPassChangeModalOpen] = useState(false)
    const [isWithdrawalDetailsShown,setIsWithdrawalDetailsShown] = useState(false)
    const [isFundingShown,setIsFundingShown] = useState(false)

   async function requestPassChange(){
        setIsPassChangeModalOpen(true)
    }
     
    return(
        <DashboardLayout title={"Settings"}>
         <div className="">
            <Modal isShown={isPassChangeModalOpen}
            setIsShowing={setIsPassChangeModalOpen}
            title={<h3 className="mg-text-warning mg-font-bold mg-text-center">Reset Password</h3>}
            >
            <ChangePasswordForm
            closeModal={()=>setIsPassChangeModalOpen(false)}
            />
            </Modal>
            <Modal 
              isShown={isWithdrawalDetailsShown}
              setIsShowing={setIsWithdrawalDetailsShown}
              title={<h3 className="mg-text-warning mg-font-bold mg-text-center">Add Withdrawal Details</h3>}
            >
                <WithdrawalDetails/>
            </Modal>
            <Modal
            isShown={isFundingShown}
            setIsShowing={setIsFundingShown}
            title={<h3 className="mg-text-warning mg-font-bold mg-text-center">Fund Account</h3>}
            >
              <FundAccountForm closeModal={()=>setIsFundingShown(false)}/>  
            </Modal>
            <div className="mg-min-vh-10 mg-bg-component mg-rounded" style={{marginTop:"20px",padding:"1em"}}>
                <header className="mg-d-flex  mg-w-100 mg-justify-between mg-align-center">
                    <h3 className="mg-text-warning mg-font-bold">Change Password</h3>
                    {loadingPassChange?<div><Spin/></div>:
                     <p className="mg-pointer" onClick={requestPassChange}>
                      <i className="bi bi-pencil mg-text-warning"></i>
                     </p>
                    }
                </header>
            </div>
            {/* <div className="mg-min-vh-10 mg-bg-component mg-rounded" style={{marginTop:"20px",padding:"1em"}}>
              <header className="mg-d-flex  mg-w-100 mg-justify-between mg-align-center">
                    <h3 className="mg-text-warning mg-font-bold">Add Withdraw Details</h3>
                    <p className="mg-pointer" onClick={()=>setIsWithdrawalDetailsShown(true)}>
                        <i className="bi bi-pencil mg-text-warning"></i>
                    </p>
              </header> 
              <div></div>
            </div> */}
            <div className="mg-min-vh-10 mg-bg-component mg-rounded" 
            onClick={()=>setIsFundingShown(true)}
            style={{marginTop:"20px",padding:"1em"}}>
              <header className="mg-d-flex  mg-w-100 mg-justify-between mg-align-center">
                    <h3 className="mg-text-warning mg-font-bold">Fund Account</h3>
              </header> 
              <div></div>
            </div>
         </div>
        </DashboardLayout>
    )
}
