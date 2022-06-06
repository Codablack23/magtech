import PriceBot from "./PriceBot"

export default function PricingContainer(){
    const bots =[
      {
        name:"Bot 1",
        price:'10',
        maxInvestment:80,
      },
      {
        name:"Bot 2",
        price:'15',
        maxInvestment:100,
      },
      {
        name:"Bot 3",
        price:'20',
        maxInvestment:200,
      },


    ]
    return(
        <div id="pricing">
            <p className="mg-text-disabled mg-text-center mg-small-30">Investment Bots and Pricing</p>
           <div className="mg-w-90" style={{
               margin:"1em auto"
           }}>
            <div className="row align-center w-100">
             {bots.map(bot=>(
               <PriceBot bot={bot}/>
             ))}
            </div>
           </div>
        </div>
    )
}