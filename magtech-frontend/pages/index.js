import Contact from '~/components/widgets/home/ContactSection'
import PricingContainer from '~/components/widgets/home/PricingContainer'
import LayoutDefault from '~/components/layouts/LayoutDefault'
import {useRouter} from 'next/router'
import { FullChart, Snaps, TickerTapeWidget } from '~/components/widgets/charts/chart'
import Steps from '~/components/widgets/home/Steps'
import Services from '~/components/widgets/home/Services'
import Features from '~/components/widgets/home/Features'

export default function Home() {
  const Router = useRouter()
  const goTo=(route)=>{
    Router.push(route)
  }
  return (
  <LayoutDefault title={"Home"} pageType={"home"}>
    <div className=''>
      <div className="mg__hero mg-vh-95 mg-vh-sm-60">
        <div className="mg__ticker-time mg-bg-component">
       <TickerTapeWidget/>
       </div>
        <div className="mg__hero-content mg-container mg-text-sm-center">
           <p className="mg-text-white title">The Right <br/>  Investment Choice</p>
           <br />
           <div className="mg__hero-action">
             <button className="mg-btn-danger mg-text-white mg-card mg-rounded-pill mg-case-upper mg-font-bold mg-small-25 mg-bg-hover-white"
             onClick={()=>goTo('/account/register')}
             style={{
               height:'55px',
               minWidth:'220px',
              }}
             >Get Started</button>
           </div>
        </div>
      </div><br />
     <div className="mg-text-center">
     <FullChart/>
     </div>
     <Services/><br />
     <Features/>
      <Steps/><br />
      <PricingContainer/><br />
      <div className="mg-container mg-text-white mg-text-center mg-min-vh-90 mg__about" id='about'>
        <div>
        <p
        className="mg-small-40 mg-small-md-20 mg-text-warning mg-font-bold mg-font-euclid">
         About Us
        </p>
        <p className='mg__about-content mg-small-18 mg-small-sm-14'><span className='mg-text-warning'><b>Magtech</b></span> is an affiliate company of Maxybest limited. A registered real estate and trading company. Our  team of experienced traders has been trading Forex for almost a decade:while still boasting of real estates scattered across the globe with the introduction of Magtech A.I trading has become more profitable and stressfree. We employ you to hop o aboard and enjoy the benefit of this A.I technology Which is profitable and stress free</p>
        </div>
      </div>
    </div>
  </LayoutDefault>
  )
}
