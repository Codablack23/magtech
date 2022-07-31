import Link from "next/link";
import Payment from "~/components/elements/dashboard/Payment";
import DashboardLayout from "~/components/layouts/DashboardLayout";
import { useContext, useState,useEffect } from "react";
import DashboardBalance from "~/components/widgets/dashbaord/Balance";
import {useFlutterwave,closePaymentModal} from 'flutterwave-react-v3'
import {getConfig} from '~/utils/flutterwave'
import { notification, Spin } from "antd";
import Payments from "~/utils/Payment";
import { AuthContext } from "~/context/auth/context";
import Investment from "~/components/widgets/dashbaord/Investment";
import { Modal } from "~/components/widgets/global/Modal";
import { getBalance } from "~/utils/getBalance";


const bots = [
  {
    name:"Bot 1",
    price:'5',
    profit:0.69,
    minDeposit:20,
    maxDeposit:50,
  },
  {
    name:"Bot 2",
    price:'8',
    profit:0.69,
    minDeposit:100,
    maxDeposit:200,
  },
  {
    name:"Bot 3",
    price:'15',
    profit:0.69,
    minDeposit:400,
    maxDeposit:500,
  },
  {
    name:"Bot 4",
    price:'30',
    profit:0.69,
    minDeposit:1000,
    maxDeposit:2000,
  },
  {
    name:"Bot 5",
    price:'100',
    profit:0.69,
    minDeposit:5000,
    maxDeposit:10000,
  },
  {
    name:"Bot 6",
    price:'200',
    profit:0.69,
    minDeposit:15000,
    maxDeposit:20000,
  },

]
async function flutterwaveCallback(res,payment_id,details,addBot){
  if(res.status === "successful"){
      const paymentStatus = await Payments.completePayment(payment_id)
      if(paymentStatus.status === "Success"){
       const botPayment = await Payments.buyBot(details)
       if(botPayment.error !== "" || botPayment.error !== " "){ 
        notification.success({
         message:<h2 className="mg-text-white">{paymentStatus.status}</h2>,
         description:<p className="mg-text-primary">{paymentStatus.message}</p>,
         className:"mg-bg-dark"
      })
      addBot(prev=>prev + 1)
       }else{
        notification.error({
          message:<h2 className="mg-text-white">Payment Error</h2>,
          description:<p className="mg-text-danger">{botPayment.error}</p>,
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


function GetBotButton({details,setDetails,showModal}){
  const {amount,percent_profit,bot_name} = details

  function startBotPayment(){
     setDetails(prev=>{
      return {
        ...prev,
        bot_price:amount,
        percent_profit,
        bot_name
      }
     })
     showModal()
  }

  return(
    <button 
    className="mg-btn-outline-warning mg-w-55 mg-w-sm-65"
    onClick={startBotPayment}
    >Get Bot</button>
  )
}
function PaidBots({bot}){
  const oneDay = 1000 * 60 * 60 * 24
  const usage_period =(new Date(bot.expires) - new Date())/oneDay
  const usage = usage_period < 90? 90 - Math.floor(usage_period) :90

return (
  <li className="mg-bg-dark mg-rounded">
  <div className="title mg-w-100">
    <p>
      <i className="bi bi-robot mg-text-warning mg-small-22"></i>
      <span className="mg-font-euclid mg-font-bold mg-small-22"
      style={{
        paddingLeft:"10px"
      }}
      >{bot.bot_id}</span>
    </p>
    {
    usage < 90?<p className="mg-text-warning">active</p>:
    <p className="mg-text-disabled">Inactive</p>
    }
  </div>
  <p>{bot.bot_name}</p>
  <div className="title">
  <p>{new Date(bot.createdAt).toDateString()}</p>
    <p>Usage: {usage}/90 days</p>
  </div>
</li>
)
}
export default function DashboardBotPage(){
  const {authState} = useContext(AuthContext)
  const [isBotLoading,setIsBotLoading] = useState(false)
  const [paidbots,setPaidBots] = useState([])
  const [botCount,setBotCount] = useState(0)
  const [investments,setInvestments] = useState([])
  const [allInvestments,setAllInvestments] = useState([])
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [currentBot,setCurrentBot] = useState({
    bot_price:10,
    percent_profit:60,
    bot_name:"Bot 1"
   })

  async function buyBot(){
    setIsBotLoading(true)
   try {
    const balance = await getBalance()
    const botPayment = await Payments.buyBot(currentBot)
    setIsBotLoading(false)
    if(currentBot.bot_price > balance){
      notification.error({
        message:<h2 className="mg-text-white">Payment Error</h2>,
        description:<p className="mg-text-danger">You do not have enough funds, you can go to your settings page to fund your account</p>,
        className:"mg-bg-component"
       })     
      console.log("You do not have enough funds")
    }else{
    if(botPayment.error !== "" || botPayment.error !== " "){ 
      setIsModalOpen(false)
      setBotCount(prev=>prev+1)
      notification.success({
       message:<h2 className="mg-text-white">Success</h2>,
       description:<p className="mg-text-primary">Bot has been successfully rented and your bot is now active</p>,
       className:"mg-bg-dark"
    })
     }else{
      notification.error({
        message:<h2 className="mg-text-white">Payment Error</h2>,
        description:<p className="mg-text-danger">{botPayment.error}</p>,
        className:"mg-bg-component"
       })
     }
    }
    } catch (error) {
      console.log(error)
      notification.error({
        message:<h2 className="mg-text-white">Payment Error</h2>,
        description:<p className="mg-text-danger">An Error Occured</p>,
        className:"mg-bg-component"
       })   
   }
     
   }
  async function getData(){
      setIsLoading(true)
      const investmentData = await Payments.getInvestments()
      console.log(investmentData)
      if(investmentData.err === ""){
      setAllInvestments(investmentData.investments)
        setInvestments(()=>{
          const oneDay = 1000 * 60 * 60 * 24
          return investmentData.investments.filter(i=>{
               const round = Math.round((new Date(i.expires) - new Date())/oneDay)
              return round > 1
          })
      })
      }
      setIsLoading(false)
  }


  async function getBots(){
    setIsBotLoading(true)
    const allbots = await Payments.getBots()
    if(allbots.bots.length !==0 ){
      setPaidBots(allbots.bots)
    }
    setIsBotLoading(false)
  }

  useEffect(() => {
   getBots() 
   getData() 
  }, [botCount])
    return(
        <DashboardLayout title={"Bots"}>
         <div className="mg__dashboard-analytics">
         <Modal 
          isShown={isModalOpen} 
          setIsShowing = {setIsModalOpen}
          useDefault={true} 
          className="mg-contain"
          >
          <br />
          <div className="row">
           <div className="col-4 col-md-5 col-sm-12">
           <div className="mg-bot-desc mg-card" style={{padding:"16px"}}>
               <h3 className="mg-text-warning mg-font-bold mg-small-22">{currentBot.bot_name}</h3>
               <div className="mg-d-flex mg-font-euclid mg-font-bold">
                <p className="mg-text-grey">Price: </p>
               <p className="mg-text-grey mg-font-euclid">${currentBot.bot_price}</p>
               </div>
               <div className="mg-d-flex mg-font-bold">
               <p className="mg-text-grey">Percentage Profit: </p>
               <p className="mg-text-grey">{currentBot.percent_profit * 100}%</p>
               </div>
               <div className="mg-d-flex mg-font-bold">
               <p className="mg-text-grey">Duration: </p>
               <p className="mg-text-grey">90 days</p>
               </div>
           </div>
           </div>
           <div className="col-8 col-md-7 col-sm-12">
            <div style={{padding:"16px"}}>
              <h2 className="mg-text-warning mg-font-bold mg-small-24">Terms and Conditions</h2><br />

              <div>
               <h3 className="mg-text-grey mg-font-bold mg-small-21">Usage</h3>
               <p  className="mg-text-grey mg-small-15">Any bot rented can only be used once and and can be used only for a single investment and the percentage profit only applies to that single investment,in the case of multiple investments, a bot can be rented as much as the required investment ie for each investment a single bot is rented. A bot is active the moment the renting process have been completed ie when it is paid for. </p>
              </div><br />
              <div>
               <h3 className="mg-text-grey mg-font-bold mg-small-21">Duration and Termination</h3>
               <p  className="mg-text-grey mg-small-15">Every bot has an active period where daily profit will be realised from invested amount, when a bot is no longer active daily profits will no longer be gotten and investment will be terminated and the capital will added to funds. In case of a premature termination only 30% of invested capital will be credited to funds and bot will be inactive and cannot be used again</p>
              </div><br />
              <div className="mg-d-flex mg-justify-end mg-align-center" style={{height:"50px"}}>
               {isBotLoading?
                <button className="mg-btn-sq-warning"><Spin/></button>:
                <button className="mg-btn-sq-warning" onClick={buyBot}>Accept and Buy</button>
               }
                <button className="mg-btn-outline-sq-warning" 
                onClick={()=>setIsModalOpen(false)}
                style={{marginLeft:"10px"}}
                >Reject and Cancel
                </button>
              </div>
            </div>
           </div>
          </div>
         </Modal>
         <div className="row mg-text-grey" style={{marginTop:"20px"}}>
              {bots.map(bot=>(
                  <div className="col-4 col-sm-12 mg-min-vh-30 mg-bg-component mg-rounded mg-bot" key={bot.name}>
                  <header className="mg-text-grey">
                    <p className="bi bi-robot mg-small-40 mg-small-md-30 mg-small-sm-20 mg-text-warning"></p>
                    <p className="mg-small-20 mg-small-md-14">{bot.name}</p>
                    </header>
                    <div>
                      <p className="mg-font-euclid">{bot.profit}% profit/90days</p>
                      <p className="mg-font-euclid">Price: ${bot.price}</p>
                      <p className="mg-font-euclid">Min Deposit: ${bot.minDeposit}</p>
                      <p className="mg-font-euclid">Max Deposit: ${bot.maxDeposit}</p>
                    </div><br />
                 <GetBotButton
                  details={{
                  amount:bot.price.toString(),
                  currentUser:authState.user?authState.user:"",
                  percent_profit:(bot.profit).toString(),
                  bot_name:bot.name
                 }}
                 showModal={()=>setIsModalOpen(true)}
                 setDetails={setCurrentBot}
                 />
                </div>
              ))}
            </div>

            <div className="row" style={{marginTop:"20px"}}>
                <div className="col-7 col-md-12 mg-min-vh-30 mg-bg-component mg-rounded">
               <header className="mg-font-euclid mg-d-flex mg-align-center mg-justify-between">
               <p className="mg-small-23 mg-font-euclid mg-text-white mg-font-bold">Paid Bots</p>
             
                {isBotLoading?<Spin/>:
                <Link href="bots/invest">
                 <a className="mg-text-warning">Invest Now</a>
                </Link>
                }
               </header><br />
                <ul className="mg__bot-list mg-text-grey">
                 {paidbots.length !== 0?
                   paidbots.map(bot=><PaidBots key={bot.bot_id} bot={bot}/>):
                  <h2 className="mg-text-disabled mg-text-center">You have not paid for any bot</h2>
                 }
                </ul>
                </div>

                <div className="col-5 col-md-12 mg-min-vh-30 mg-bg-component mg-rounded">
                 <DashboardBalance/>
                </div>
            </div><br /><br />
            
            <div className="mg-bg-component mg-rounded"
            style={{padding:"0.8em"}}
            >
              <heading className="mg-d-flex mg-justify-between">
              <p className="mg-small-23 mg-font-euclid 
                mg-text-white
                mg-font-bold
                mg-text-center
                ">Pending Investments</p>
              <p style={{margin:"0.7em 0.5em"}}>
              {isLoading && (<Spin/>)}
              </p>
              </heading>
            <div className="mg__pending-investments">                        
            {investments.length > 0?
                investments.map(investment=><Investment investment={investment}/>)
                :<></>}
               </div>
            </div><br />

            <div className="mg-min-vh-50 mg-bg-component mg-rounded" style={{marginTop:"20px"}}>
                   <heading className="mg-d-flex mg-justify-between align-items-center" style={{padding:"16px"}}>
                   <p className="mg-small-23 mg-font-euclid 
                      mg-text-white
                      mg-font-bold
                      mg-text-center
                      ">All Investments</p>
                    <p style={{margin:"0.7em 0.5em"}}>
                    {isLoading && (<Spin/>)}
                   </p>
                   </heading>
             <ul className="mg__payment-list">
              {allInvestments.length >0?
              allInvestments.map(i=><Payment payment={i}/>)
              :<h2 className="mg-text-disabled mg-text-center">You Have not made any investment yet</h2>}
             </ul>
            </div>
         </div>
        </DashboardLayout>
    )
}