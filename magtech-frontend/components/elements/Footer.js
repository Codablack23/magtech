import Link from "next/link";

export default function Footer(){
    return(
     <div className="mg-footer-container">
       <footer className="mg-footer mg-container mg-bg-component">
        <div className="mg-news-letter">
            <p className="mg-footer-logo mg-text-warning">Magtech</p>
            <p className="mg-text-grey mg-news-letter-text">Sign up for our newsletter</p>
            <div className="mg-subscribe-container">
                <input type="email" placeholder="Email Address" />
                <button className="mg-subscribe-btn">Subscribe</button>
            </div>
        </div>
        <div className="mg-all-footer-links">
          <div className="mg-footer-links">
              <p className="mg-footer-link-heading mg-text-warning">Company</p>
              <Link href={"/"}>
               <p className="mg-text-grey">Home</p>
              </Link>
              <Link href={"/"}>
              <p className="mg-text-grey">Features</p>
              </Link>
              <Link href={"/"}>
              <p className="mg-text-grey">Pricing</p>
              </Link>
          </div>
          <div className="mg-footer-links">
              <p className="mg-footer-link-heading mg-text-warning">Product</p>
              <Link href={"/"}>
               <p className="mg-text-grey">Analytics</p>
              </Link>
              <Link href={"/"}>
              <p className="mg-text-grey">Integrations</p>
              </Link>
              <Link href={"/"}>
              <p className="mg-text-grey">Testimonials</p>
              </Link>
          </div>
          <div className="mg-footer-links">
              <p className="mg-footer-link-heading mg-text-warning">Legal</p>
              <Link href={"/"}>
               <p className="mg-text-grey">Privacy Policy</p>
              </Link>
              <Link href={"/"}>
              <p className="mg-text-grey">Terms of Use</p>
              </Link>
          </div>
          
        </div>
        </footer>
         <div className="mg-text-center mg-bg-dark mg-container">
         <p className="mg-text-primary">Copyright 2022 Magtech. All Rights Reserved.</p>
     </div>
     </div>
    )
}