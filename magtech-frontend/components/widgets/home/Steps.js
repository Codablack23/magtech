export default function Steps(){
    return(
        <div className="mg-container mg-min-vh-80" id='how-it-works'>
        <p className="mg-text-primary mg-small-40 mg-small-md-22 mg-font-bold mg-font-euclid mg-text-center"> How Magtech Works </p>
        <p className="mg-text-grey mg-description mg-text-center mg-small-18">A brief overview of how to get started with investments with magtech and start making profits </p>
        <br /><br />
        <div className="row mg-text-center">
            <div className="col-4 col-md-12 mg-step">
              <header className="mg-bg-component">
                <i className="bi bi-hand-index-thumb mg-text-primary"></i>
              </header>
              <p className="mg-small-25 mg-font-euclid mg-font-bold mg-text-white">Choose A Bot</p>
              <p className="mg-text-grey">
                Select The Bot Of Your Choice
              </p>
            </div>
            <div className="col-4 col-md-12 mg-step">
            <header className="mg-bg-component">
                <i className="bi bi-credit-card mg-text-primary"></i>
              </header>
               <p className="mg-small-25 mg-font-euclid mg-font-bold mg-text-white">Buy Bot</p>
               <p className="mg-text-grey">Make a payment for the rent of the bot you have selected</p>
            </div>
            <div className="col-4 col-md-12 mg-step">
            <header className="mg-bg-component mg-text-primary">
                <i className="bi bi-graph-up"></i>
              </header>
              <p className="mg-small-25 mg-font-euclid mg-font-bold mg-text-white">Invest With Bot</p>
              <p className="mg-text-grey">Make deposit for the bot to start investment either through a fiat or cryptocurrency</p>
             </div>
        </div>
      </div>
    )
}