import PriceBot from "./PriceBot"

export default function PricingContainer(){
    const bots =[
      {
        name:"Bot 1",
        price:'10',
        percent_profit:0.30,
        minInvestment:10,
        maxInvestment:100,
      },
      {
        name:"Bot 2",
        price:'25',
        minInvestment:200,
        percent_profit:0.45,
        maxInvestment:500,
      },
      {
        name:"Bot 3",
        price:'40',
        percent_profit:0.60,
        minInvestment:500,
        maxInvestment:"???",
      },


    ]
    return(
        <div id="pricing">
            <p className="mg-text-white mg-text-center mg-font-bold mg-small-40 mg-font-euclid">Our Products</p>
            <p className="mg-text-grey mg-text-center">Magtech offers a range of bots that can be hired for a specific period of time</p>
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