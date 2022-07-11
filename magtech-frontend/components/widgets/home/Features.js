export default function Features(){
    return(
        <section className="mg-container mg-text-white mg-min-vh-70 mg__services" id="features">
            <div className="row" style={{alignItems:"center"}}>
             
              <div className="col-6 col-md-12">
               <p 
               className="mg-small-40 mg-small-md-18  mg-text-white mg-font-bold mg-font-euclid"
               style={{marginBottom:"10px"}}
               >
                Features
               </p>
               <p>Some Important feature that should make join Magtech</p>
               <ul className="mg__service-list">
                 <li><span className="index">01</span> Refer and Earn</li>
                 <li><span className="index">02</span> Anytime Profits Withdrawal</li>
                 <li><span className="index">03</span> Daily Profits</li>
                 <li><span className="index">04</span> Capital Withdrawal after 90 days</li>
                 <li><span className="index">05</span> Funding</li>
                 <li><span className="index">05</span> Investment Bots</li>
               </ul>
              </div>
              <div className="col-6 col-md-12">
                <img src="/images/features.jpg" className="mg-w-90 mg-rounded" alt="" />
              </div>
            </div>
        </section>
    )
}