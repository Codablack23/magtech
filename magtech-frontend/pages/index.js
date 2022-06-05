import Contact from '~/components/home/ContactSection'
import PricingContainer from '~/components/home/PricingContainer'
import LayoutDefault from '~/components/layouts/LayoutDefault'

export default function Home() {
  return (
  <LayoutDefault title={"Home"} pageType={"home"}>
    <div className='mg-contain mg-home-container'>
      <br />
      <br />
      <div className="row mg-min-vh-80">
        <div className="col-6 col-md-12">
           <p className="mg-text-white mg-small-32">Lets Get You Started With Your investment</p><br />
           <p className='mg-text-white mg-small-20'>The Metric Dashboard brings all of your business insights under one roof. Revenue metrics, social, integrations - everything.</p>
        </div>
        <div className="col-6 col-md-12">
         <div className="mg-w-100 mg-vh-50 mg-rounded">
           <img src="/images/hero.png" alt="" className="mg-img-fluid mg-vh-50 mg-rounded" />
         </div>
        </div>
      </div>
      <PricingContainer/><br />
      <Contact/>
    </div>
  </LayoutDefault>
  )
}
