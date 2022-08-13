import PriceBot from "./PriceBot"

export default function PricingContainer(){
    const bots =[
      {
        name:"Bot 1",
        price:'5',
        percent_profit:0.60,
        minInvestment:20,
        maxInvestment:50,
      },
      {
        name:"Bot 2",
        price:'8',
        percent_profit:0.60,
        minInvestment:100,
        maxInvestment:200,
      },
      {
        name:"Bot 3",
        price:'15',
        percent_profit:0.60,
        minInvestment:400,
        maxInvestment:500,
      },
      {
        name:"Bot 4",
        price:'30',
        percent_profit:0.60,
        minInvestment:1000,
        maxInvestment:2000,
      },
      {
        name:"Bot 5",
        price:'100',
        percent_profit:0.60,
        minInvestment:5000,
        maxInvestment:10000,
      },
      {
        name:"Bot 6",
        price:'200',
        percent_profit:0.60,
        minInvestment:15000,
        maxInvestment:20000,
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
               <PriceBot key={bot.name} bot={bot}/>
             ))}
            </div>
           </div>
        </div>
    )
}