import Link from "next/link";
import Payment from "~/components/elements/dashboard/Payment";
import DashboardLayout from "~/components/layouts/DashboardLayout";
import DashboardBalance from "~/components/widgets/dashbaord/Balance";
import Investment from "~/components/widgets/dashbaord/Investment";

const bots = [
    {name:"Bot 1",price:5,maxDeposit:50,profit:10},
    {name:"Bot 2",price:8,maxDeposit:200,profit:15},
    {name:"Bot 3",price:15,maxDeposit:500,profit:20},
    {name:"Bot 4",price:30,maxDeposit:2000,profit:20},
    {name:"Bot 5",price:100,maxDeposit:10000,profit:20},
    {name:"Bot 6",price:200,maxDeposit:20000,profit:20}
]

export default function DashoardBotPage(){
    return(
        <DashboardLayout title={"Bots"}>
         <div className="mg__dashboard-analytics">
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
                      <p className="mg-font-euclid">Max Deposit: ${bot.maxDeposit}</p>
                    </div><br />
                    <button className="mg-btn-outline-warning mg-w-55 mg-w-sm-65">Get Bot</button>
                
                </div>
              ))}
            </div>

            <div className="row" style={{marginTop:"20px"}}>
                <div className="col-7 col-md-12 mg-min-vh-30 mg-bg-component mg-rounded">
               <header className="mg-font-euclid mg-d-flex mg-align-center mg-justify-between">
               <p className="mg-small-23 mg-font-euclid mg-text-white mg-font-bold">Paid Bots</p>
               <Link href="bots/invest">
               <a className="mg-text-warning">Invest Now</a>
               </Link>
               </header><br />
                <ul className="mg__bot-list mg-text-grey">
                    <li className="mg-bg-dark mg-rounded">
                      <div className="title mg-w-100">
                        <p>
                          <i className="bi bi-robot mg-text-warning mg-small-22"></i>
                          <span className="mg-font-euclid mg-font-bold mg-small-22">124</span>
                        </p>
                        <p className="mg-text-warning">active</p>
                      </div>
                      <p>Bot 1</p>
                      <div className="title">
                      <p>{new Date().toDateString()}</p>
                        <p>Usage: 30/90 days</p>
                      </div>
                    </li>

                    <li className="mg-bg-dark mg-rounded">
                      <div className="title mg-w-100">
                        <p>
                          <i className="bi bi-robot mg-text-warning mg-small-22"></i>
                          <span className="mg-font-euclid mg-font-bold mg-small-22">124</span>
                        </p>
                        <p className="mg-text-disabled">inactive</p>
                      </div>
                      <p>Bot 1</p>
                      <div className="title">
                        <p>{new Date().toDateString()}</p>
                        <p>Usage: 30/90 days</p>
                      </div>
                    <p className="mg-text-end"> 
                     <button className="mg-btn-outline-warning mg-w-35 mg-w-md-45 mg-w-sm-55">Invest</button>
                    </p>
                    </li>
                </ul>
                </div>

                <div className="col-5 col-md-12 mg-min-vh-30 mg-bg-component mg-rounded">
                 <DashboardBalance/>
                </div>
            </div><br /><br />
            
            <div className="mg-bg-component mg-rounded"
            style={{padding:"0.8em"}}
            >
              <p className="mg-small-23 mg-font-euclid mg-text-white mg-font-bold mg-text-center">Pending Investments</p>
                  <div className="mg__pending-investments">                        
                   <Investment/>
                   <Investment/>
                   <Investment/>
                   <Investment/>
               </div>
            </div><br />

            <div className="mg-min-vh-50 mg-bg-component mg-rounded" style={{marginTop:"20px"}}>
            <p 
              className="mg-small-23 mg-font-euclid 
              mg-text-white mg-font-bold mg-text-center">
             All investments
             </p>
             <ul className="mg__payment-list">
               <Payment/>
             </ul>
            </div>
         </div>
        </DashboardLayout>
    )
}