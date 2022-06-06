import Link from "next/link"

export default function PriceBot({bot}){
    const percent_profit = 0.15
    const duration = 2

  return(
    <div className="col-4 col-md-12 mg-bg-component mg-min-vh-50">
    <p className="mg-small-30 mg-text-warning">{bot.name}</p><br />
    <p className="mg-text-white mg-small-18">
        <span className="mg-text-warning mg-small-20 mg-font-bold">${bot.price}</span>
        <span>/2 months</span>
    </p>
    <p className="mg-text-white mg-small-18">
      <span className="mg-text-warning mg-small-20 mg-font-bold">Duration: </span>
      <span>{duration} month(s)</span>
    </p>
    <p className="mg-text-white mg-small-18">
      <span className="mg-text-warning mg-small-20 mg-font-bold">Max Deposit: </span>
      <span>${bot.maxInvestment}</span>
    </p>
    <p className="mg-text-white mg-small-18">
      <span className="mg-text-warning mg-small-18 mg-font-bold">Total Percentage Profit: </span>
      <span>${percent_profit * 100}%</span>
    </p><br />
    <hr />
    <div>
      <br />
      <p className="mg-small-16 mg-text-white">
          <span className="mg-font-bold">Email </span>
          <span>Support</span>
      </p>
      <p className="mg-small-16 mg-text-white">
          <span className="mg-font-bold">Anytime </span>
          <span>withdrawal of profits</span>
      </p>
    </div><br />
   <Link href={"/account/"}>
    <a className="mg-bot-btn mg-bg-warning mg-rounded mg-w-80">Choose Bot</a>
   </Link>
  </div>
  )
}