import { Progress,notification, Spin} from "antd"
import { useState,useEffect,useContext } from "react"
import { Modal } from "~/components/widgets/global/Modal";
import {getConfig} from '~/utils/flutterwave'
import Payments from "~/utils/Payment";
import {useFlutterwave,closePaymentModal} from 'flutterwave-react-v3'
import { AuthContext } from "~/context/auth/context";
import { RateContext } from "~/context/payments/rateContext";

function FundAccountForm({closeModal}){
    const {authState} = useContext(AuthContext)
    const {paymentRates} = useContext(RateContext)

    const [amount,setAmount] = useState(0)
    const [isLoading,setIsLoading] = useState(false)

    const showPaymentModal = useFlutterwave(getConfig({
        amount:amount * paymentRates.USD_NGN,
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

            const payment = await Payments.startPayment({
                amount:amount,
                description:"Payment for investment Bot"
            })
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
        <h2 className="mg-text-grey mg-text-center mg-font-euclid">Exchange rate for 1USD is at NGN{paymentRates.USD_NGN} </h2>
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



export default function DashboardBalance(){
    const [balance,setBalance] = useState(0)
    const [investmentsTotal,setInvestment] = useState(0)
    const [refferralsTotal,setRefferral] = useState(0)
    const [all_funds,setFunds] = useState(0)
    const [isLoading,setIsLoading] = useState(false)
    const [withdrawalTotal,setWithdrawal] = useState(0)
    const [isFundingShown,setIsFundingShown] = useState(false)

    async function getData(){
        setIsLoading(true)
        const date = new Date()
        const aSecond = 1000 * 60 
        const investmentData = await Payments.getInvestments()
        const PaymentsData = await Payments.getPayments()
        const {withdrawals} = await Payments.getWithdrawals()
        const {refs} = await Payments.getRefs()
        const {bots} = await Payments.getBots()

        const p_total = PaymentsData.payments.filter(p=>p.status === "paid").reduce((total,p)=>(total +p.amount),0)
        const i_total =  investmentData.investments.reduce((a,b)=>(a + b.amount),0)
        const w_total =  withdrawals.filter(p=>p.status === "paid").reduce((a,b)=>(a + b.amount),0)
        const ref_total =  refs.reduce((a,b)=>(a + b.amount),0)
        const b_total = bots.reduce((a,b)=>(a + b.bot_price),0)
        const funds = p_total - (i_total + w_total + ref_total + b_total)
        const iTotal = investmentData.investments.reduce((a,b)=>{ 
            const expires = new Date(b.expires)
            const timeLeft = (expires - date) /(1000 * 60 * 60 * 24 )
            const tot = a + ((b.amount * b.percentage_profit)/timeLeft)
            console.log(tot)
            return tot
        },0)
        setRefferral(ref_total)
        setWithdrawal(w_total)
        setInvestment(iTotal)
        setFunds(funds)
        setBalance((iTotal + funds) - w_total)
        setIsLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])
    return(
        <div>
             <Modal
            isShown={isFundingShown}
            setIsShowing={setIsFundingShown}
            title={<h3 className="mg-text-warning mg-font-bold mg-text-center">Fund Account</h3>}
            >
              <FundAccountForm closeModal={()=>setIsFundingShown(false)}/>  
            </Modal>
             <p 
                 className="mg-small-20 mg-font-euclid 
                 mg-text-white mg-font-bold mg-text-center">
                 Available Balance
                 </p>
                 <p className="mg-small-14 mg-text-disabled mg-text-center">(Only available profits can be withdrawn while investment is ongoing)</p>
                 <p className="mg-small-35 mg-font-bold  mg-text-center mg-font-euclid mg-text-warning">${balance.toFixed(3)}</p>
                
                  <p className="mg-small-20 mg-font-euclid mg-text-white mg-font-bold">Statistics</p><br />
                  <div><br />
                  <p className="mg-text-grey mg-font-euclid ">Funds: <span className="mg-text-warning mg-font-euclid">${all_funds}</span></p>
                  <Progress strokeColor={"#fcd535"} 
                      width={170}
                      trailColor="#0b0e11"
                      percent={(all_funds/balance) * 100}
                      format={percent=><p className="mg-text-warning mg-small-15"></p>}
                      />
                  </div>
                  <div>
                  <p className="mg-text-grey mg-font-euclid ">Total Profits: <span className="mg-text-warning mg-font-euclid">${investmentsTotal.toFixed(3)}</span></p>
                  <Progress strokeColor={"#fcd535"} 
                      width={170}
                      trailColor="#0b0e11"
                      percent={(investmentsTotal/balance)*100}
                      format={percent=><p className="mg-text-warning mg-small-15"></p>}
                      />
                  </div><br />

                  <div>
                  <p className="mg-text-grey mg-font-euclid ">Refferal Bonus: <span className="mg-text-warning mg-font-euclid">${refferralsTotal}</span></p>
                  <Progress strokeColor={"#fcd535"} 
                      width={170}
                      trailColor="#0b0e11"
                      percent={(refferralsTotal/balance) * 100}
                      format={percent=><p className="mg-text-warning mg-small-15"></p>}
                      />
                  </div>

                  <div><br />
                  <p className="mg-text-grey mg-font-euclid ">Total Withdrawals: <span className="mg-text-warning mg-font-euclid">-${withdrawalTotal}</span></p>
                  <Progress strokeColor={"#fcd535"} 
                      width={170}
                      trailColor="#0b0e11"
                      percent={(withdrawalTotal/balance) * 100}
                      format={percent=><p className="mg-text-warning mg-small-15"></p>}
                      />
                  </div><br/>
                  <div>
                     <button 
                       onClick={()=>setIsFundingShown(true)}
                     className="mg-btn-outline-warning">Fund Account</button>
                  </div>

        </div>
    )
}