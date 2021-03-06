import Payment from "~/components/elements/dashboard/Payment";
import WithdrawalForm from "~/components/elements/dashboard/WithdrawalForm";
import DashboardLayout from "~/components/layouts/DashboardLayout";
import DashboardBalance from "~/components/widgets/dashbaord/Balance";
import Payments from "~/utils/Payment";
import {Spin} from "antd"
import {useState,useEffect} from 'react'
import { Modal } from "~/components/widgets/global/Modal";

export default function DashoardWithDrawalPage(){
    const [amount,setAmount] = useState(0)
    const [payments,setPayments] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [isShowing,setIsShowing] = useState(false) 

    async function getData(){
        
        setIsLoading(true)
        const paymentData =  await Payments.getPayments()
        
        setPayments(paymentData.payments)
        setIsLoading(false)
    }
    useEffect(() => {
       getData() 
    }, [])
    return(
        <DashboardLayout title={"Withdrawals"}>
         <div className="">
            <div className="row" style={{marginTop:"20px"}}>
                <div className="col-6 col-md-12 mg-min-vh-35 mg-bg-component mg-rounded">
                <DashboardBalance/>
                </div>

                <div className="col-6 col-md-12 mg-min-vh-30 mg-bg-component mg-rounded">
                 <p 
                  className="mg-small-20 mg-font-euclid 
                  mg-text-warning mg-font-bold">
                  Request withdrawal
                 </p><br />

                 <form className="mg__withdrawal-form mg-text-grey">
                    <div className="mg-input-group mg-w-100">
                        <label htmlFor="account">Amount</label>
                        <div className="mg-input-field mg-input-field-disabled-light mg-w-100">
                            <input type="number mg-w-100"
                             value={amount} 
                             onChange={(e)=>setAmount(e.target.value)}
                             />
                        </div>
                    </div><br />
                    <button className="mg-btn-warning mg-w-65"
                    type="button"
                    onClick={()=>setIsShowing(true)}
                    >Withdraw</button>
                  </form>
                {/* <WithdrawalForm/> */}
                </div>
            </div>
            <Modal isShown={isShowing} 
            title={<p className="mg-small-20 mg-font-euclid mg-text-center mg-text-warning mg-font-bold">Beneficiary Details</p>}
            setIsShowing={setIsShowing}
            >
            
            <WithdrawalForm amount={amount}/>
            </Modal>
            <div className="mg-min-vh-50 mg-bg-component mg-rounded" style={{marginTop:"20px"}}>
            <header className="mg-d-flex mg-justify-between">
             <p 
              className="mg-small-23 mg-font-euclid 
              mg-text-white mg-font-bold"
              style={{margin:"0.7em 0.5em"}}
              >
             Withdrawals
             </p>
             <p style={{margin:"0.7em 0.5em"}}>
                {isLoading && (<Spin/>)}
             </p>
            </header>
             <ul className="mg__payment-list">
             {payments.length > 0?
                 payments.map(payment=><Payment payment={payment}/>)
               :
                 <h2 className="mg-text-disabled mg-text-center">
                    You have not made any transaction
                </h2>}
             </ul>
            </div>
         </div>
        </DashboardLayout>
    )
}