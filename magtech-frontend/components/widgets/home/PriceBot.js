import Link from "next/link"

export default function PriceBot({bot}){
    const percent_profit = 0.15
    const duration = 90

  return(
    <div className="col-4 col-md-6 col-sm-12 mg-bg-component mg-min-vh-70 mg-bg-hover-dark mg-card mg-hover-scale mg-rounded" key={bot.name}>
    <p className="mg-small-30 mg-text-white">
       <i className="bi bi-robot mg-text-white mg-small-25"></i>
       <span className="mg-font-euclid mg-small-25 mg-font-bold"> {bot.name}</span>
    </p><br />
    <p className="mg-text-white mg-small-18 mg-text-center">
        <span className="mg-text-warning mg-small-45 mg-font-bold mg-font-euclid">${bot.price}</span>
    </p>
    <Link href={"/account/"}>
    <p className="mg-bot-btn mg-bg-warning mg-rounded mg-w-80" style={{cursor:"pointer"}}>Get Started</p>
   </Link>
    <div className="mg-container-small">
     <p className="mg-text-white mg-small-18"><i className="bi bi-check-lg mg-text-warning"></i>   Usage time of {duration} day(s)</p>
     <p className="mg-text-white mg-small-18"><i className="bi bi-check-lg mg-text-warning"></i>   ${bot.minInvestment} min deposit</p>
     <p className="mg-text-white mg-small-18"><i className="bi bi-check-lg mg-text-warning"></i>   ${bot.maxInvestment} max deposit</p>
     <p className="mg-text-white mg-small-18"><i className="bi bi-check-lg mg-text-warning"></i>   {bot.percent_profit * 100}% total profit</p>
      <p className="mg-small-16 mg-text-white">
          <i className="bi bi-check-lg mg-text-warning"></i>  
          <span className="mg-font-bold">   Anytime </span>
          <span>withdrawal of profits</span>
      </p>
    </div><br />
 
  </div>
  )
}