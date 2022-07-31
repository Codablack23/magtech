import { useContext, useState } from "react";
import WithdrawalDetails from "~/components/elements/dashboard/withdrawalDetails";
import DashboardLayout from "~/components/layouts/DashboardLayout";
import { Modal } from "~/components/widgets/global/Modal";
import {getConfig} from '~/utils/flutterwave'
import { notification, Spin } from "antd";
import Payments from "~/utils/Payment";
import {useFlutterwave,closePaymentModal} from 'flutterwave-react-v3'
import { AuthContext } from "~/context/auth/context";

function ChangePasswordForm(){
    return(
        <form style={{padding:"10px"}}>
        <p className="mg-small-12 mg-text-disabled mg-text-center">A 6 digit code have been sent to your mail for reseting your password, do not share with anyone</p>
        <br />
        <div className="mg-input-group">
            <label htmlFor="" className="mg-text-grey">OTP</label>
            <div className="mg-input-field mg-input-field-disabled">
                <input className="mg-w-100 mg-text-grey" type="text" maxLength={6} max={3} name="" id="" />
            </div>
        </div>
        <div className="mg-input-group">
            <label htmlFor="" className="mg-text-grey">New Password</label>
            <div className="mg-input-field mg-input-field-disabled">
                <input className="mg-w-100  mg-text-grey" type="password" name="" id="" />
            </div>
        </div>
        <div className="mg-input-group">                    <label htmlFor="" className="mg-text-grey">Confirm New Password</label>
            <div className="mg-input-field mg-input-field-disabled">
                <input className="mg-w-100  mg-text-grey" type="password" name="" id="" />
            </div>
        </div><br />
        <button className="mg-btn-warning mg-w-100">Change Password</button>
     </form>
    )
}

function FundAccountForm({closeModal}){
    const {authState} = useContext(AuthContext)
    const [amount,setAmount] = useState(0)
    const [isLoading,setIsLoading] = useState(false)

    const showPaymentModal = useFlutterwave(getConfig({
        amount,
        email:authState.user.email?authState.user.email:"",
        description:"Payment for investment Bot"
    }))


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
   :<button className="mg-btn-warning mg-w-100" onClick={fundAccount}>Pay</button>
   }
 </form>
    )
}

export default function DashoardSettingsPage(){
    const [loadingPassChange,setLoadingPassChange] = useState(false)
    const [isPassChangeModalOpen,setIsPassChangeModalOpen] = useState(false)
    const [isWithdrawalDetailsShown,setIsWithdrawalDetailsShown] = useState(false)
    const [isFundingShown,setIsFundingShown] = useState(false)

    function requestPassChange(){
      setLoadingPassChange(true)
      setIsPassChangeModalOpen(true)
      setLoadingPassChange(false)

    }
     
    return(
        <DashboardLayout title={"Settings"}>
         <div className="">
            <Modal isShown={isPassChangeModalOpen}
            setIsShowing={setIsPassChangeModalOpen}
            title={<h3 className="mg-text-warning mg-font-bold mg-text-center">Reset Password</h3>}
            >
            <ChangePasswordForm/>
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
            <div className="mg-min-vh-10 mg-bg-component mg-rounded" style={{marginTop:"20px",padding:"1em"}}>
              <header className="mg-d-flex  mg-w-100 mg-justify-between mg-align-center">
                    <h3 className="mg-text-warning mg-font-bold">Add Withdraw Details</h3>
                    <p className="mg-pointer" onClick={()=>setIsWithdrawalDetailsShown(true)}>
                        <i className="bi bi-pencil mg-text-warning"></i>
                    </p>
              </header> 
              <div></div>
            </div>
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