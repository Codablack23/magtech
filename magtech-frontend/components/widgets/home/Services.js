export default function Services(){
    return(
        <section className="mg-container mg-text-white mg-min-vh-70 mg__services" id="services">
            <div className="row">
              <div className="col-6 col-md-12">
                <img src="/images/services.jpg" className="mg-w-90 mg-rounded" alt="" />
              </div>
              <div className="col-6 col-md-12">
               <p
                className="mg-small-40 mg-small-md-20 mg-text-white mg-font-bold mg-font-euclid"
                style={{marginBottom:"10px"}}
                >
                    Our Services
                </p>
               <p>Our AI leverages with arbitrage to provide the following services</p>
               <ul className="mg__service-list">
                 <li><span className="index">01</span> Forex Trading</li>
                 <li><span className="index">02</span> Crypto Trading</li>
                 <li><span className="index">03</span> Daily Profits</li>
               </ul>
              </div>
            </div>
        </section>
    )
}