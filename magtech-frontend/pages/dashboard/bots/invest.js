import Link from "next/link";
import DashboardLayout from "~/components/layouts/DashboardLayout";
import {useFlutterwave,closePaymentModal} from 'flutterwave-react-v3'
import {getConfig} from '~/utils/flutterwave'
import { useContext, useState,useEffect } from "react";
import { notification } from "antd";
import Payments from "~/utils/Payment";
import { AuthContext } from "~/context/auth/context";



export default function InvestPage(){
    const {authState} = useContext(AuthContext)
    const [bot_id,setBotID] = useState("buy-bot")
    const [paidBots,setPaidBots] = useState([])
    const [amount,setAmount] = useState(0.00)
    const currentUser = authState.user?authState.user:{}
    const showPaymentModal = useFlutterwave(getConfig({amount,email:currentUser.email,description:"Hello world"}))

    async function getBots(){
        const allbots = await Payments.getBots()
        if(allbots.bots.length !==0 ){
          setPaidBots(allbots.bots)
        }
      }
    useEffect(() => {
        getBots()
    }, [])

    


      async function flutterwaveCallback(res,payment_id){
        if(res.status === "successful"){
            const paymentStatus = await Payments.completePayment(payment_id)
            if(paymentStatus.status === "Success"){
                const investment = await Payments.makeInvestment({amount,bot_id})
                console.log(investment)
                if(investment.investment){ 
                    notification.success({
                     message:<h2 className="mg-text-white">{paymentStatus.status}</h2>,
                     description:<p className="mg-text-primary">{paymentStatus.message}</p>,
                     className:"mg-bg-dark"
                  })
                   }else{
                    notification.error({
                      message:<h2 className="mg-text-white">Payment Error</h2>,
                      description:<p className="mg-text-danger">{investment.error}</p>,
                      className:"mg-bg-component"
                     })
                   }
            }
            else {
                notification.error({
                    message:<h2 className="mg-text-white">Payment Error</h2>,
                    description:<p className="mg-text-danger">Payment couldn't be completed please try again</p>,
                    className:"mg-bg-component"
                })
          
            }
       }
       closePaymentModal()
    } 

    async function handleSubmit(e){
        e.preventDefault()
        const currentUser = authState.user
       const payment = await Payments.startPayment({amount,description:"payment for investment"})
       if(payment.payment_id){
        showPaymentModal({
                callback:(res)=>flutterwaveCallback(res,payment.payment_id),
                onClose:()=>{}
                })
       }else{
        notification.error({
            message:<h2 className="mg-text-white">Payment Error</h2>,
            description:<p className="mg-text-danger">there might have been an error with server please try again later</p>,
            className:"mg-bg-component"
        })
       }
    }
    return(
        <DashboardLayout title={"Invest"}>          
             <form className="mg__investment-page mg-bg-component mg-rounded  mg-text-grey">
                <p className="mg-font-euclid mg-small-22 mg-font-bold mg-small-md-18 mg-text-center mg-text-warning">Make Investment</p><br />

                <div className="mg-input-group">
                    <label htmlFor="">Amount</label>
                    <div className="mg-input-field mg-input-field-disabled">
                        <input value={amount}
                         onChange={(e)=>setAmount(e.target.value)} 
                         className="mg-w-95" type={"number"}
                        />
                    </div>
                </div>
                <div className="mg-input-group">
                    <label htmlFor="">Select Bot ID</label>
                    <div className="mg-input-field mg-input-field-disabled">
                        <select name="" className="mg-w-95" 
                         onChange={(e)=>setBotID(e.target.value.toString().toLowerCase())}
                         value={bot_id} id="">
                            <option value="buy-bot" className="mg-bg-dark">Buy Bot</option>
                            {paidBots.map(bot=>(
                            <option value={bot.bot_id}className="mg-bg-dark" key={bot.bot_id}>{bot.bot_id}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mg-input-group">
                    <label htmlFor="">Pay From</label>
                    <div className="mg-input-field mg-input-field-disabled">
                        <select name="" className="mg-w-95" id="">
                            <option value={"balance"}>Available Balance</option>
                            <option value="checkout">Checkout</option>
                        </select>
                    </div>
                </div>
                <br />
                <p className="mg-small-12" style={{margin:"1em 0"}}>I agree to <Link href={"/"}><a className="mg-text-disabled mg-small-12">Terms</a></Link> and <Link href={"/"}><a  className="mg-text-disabled mg-small-12">Conditions</a></Link>  by making this investment</p>
                <button className="mg-btn-warning mg-w-100 mg-case-capital" onClick={handleSubmit}>Continue</button>
             </form>
        </DashboardLayout>
    )
}