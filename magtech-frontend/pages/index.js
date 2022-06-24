import Contact from '~/components/widgets/home/ContactSection'
import PricingContainer from '~/components/widgets/home/PricingContainer'
import LayoutDefault from '~/components/layouts/LayoutDefault'
import {useRouter} from 'next/router'
import { FullChart, TickerTapeWidget } from '~/components/widgets/charts/chart'

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
           <p className="mg-text-white title">Your Profit <br/> Your Investment</p>
           <br />
           <div className="mg__hero-action">
             <button className="mg-btn-danger mg-text-white mg-card mg-rounded-pill mg-case-upper mg-font-bold mg-small-25 mg-bg-hover-primary"
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
      <PricingContainer/><br />
      <div className="mg-how-it-works mg-min-vh-60" id='how-it-works'>
        <p className="mg-text-warning mg-small-30 mg-text-center"> How it Works </p>
        <p className="mg-text-grey mg-description mg-text-center mg-small-18">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nesciunt dolorum ipsum placeat nisi odio debitis, sint fugit, sed eum consequatur consequuntur itaque aliquid quisquam. Ab odit officiis necessitatibus, ipsum, quidem quos repellendus sequi nam incidunt quia dolor quas est. Maiores nemo, nulla quis veniam eum iusto error. Assumenda, eligendi.</p>
      </div><br />
      <Contact/>
    </div>
  </LayoutDefault>
  )
}
