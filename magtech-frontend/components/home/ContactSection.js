export default function Contact(){
    return(
        <section className="">
             <div className="mg-contact-form-container mg-bg-component mg-min-vh-70">
               <p className="mg-text-primary mg-text-center mg-small-30">Contact Us</p>
               <form action="" className="mg-account-form">
                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Email</label>
                      <div className="mg-input-field mg-border-primary">
                          <input type="email" className="mg-text-primary" />
                      </div>
                   </div>
                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Full Name</label>
                      <div className="mg-input-field mg-border-primary">
                          <input type="email" className="mg-text-primary" />
                      </div>
                   </div>
                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Description</label>
                      <div className="mg-input-field mg-border-primary">
                          <input type="email" className="mg-text-primary" />
                      </div>
                   </div>
                   <div className="mg-input-container">
                    <label htmlFor="" className="mg-input-label mg-text-grey">Message</label>
                     <textarea 
                     className="mg-border-primary
                      mg-rounded mg-bg-none mg-w-100 
                      mg-vh-15 mg-outline-transparent
                      mg-small-17 mg-text-primary
                      "
                     style={{padding:"0.5em 1em"}}
                     >

                     </textarea>
                   </div>
                   <br /><br />
                   <button className="mg-submit-btn mg-bg-primary">Send Email</button>
               </form>
            </div>
        </section>
    )
}