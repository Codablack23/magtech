import Contact from '~/components/widgets/home/ContactSection'
import PricingContainer from '~/components/widgets/home/PricingContainer'
import LayoutDefault from '~/components/layouts/LayoutDefault'
import {useRouter} from 'next/router'

export default function Home() {
  const Router = useRouter()
  const goTo=(route)=>{
    Router.push(route)
  }
  return (
  <LayoutDefault title={"Home"} pageType={"home"}>
    <div className='mg-contain mg-home-container'>
      <div className="row mg-min-vh-90 align-center">
        <div className="col-6 col-md-12 mg-text-md-center">
           <p className="mg-text-white mg-small-sm-28 mg-small-32 ">Lets Get You Started With Your investment</p><br />
           <p className='mg-text-white mg-small-sm-16 mg-small-20 mg-small-sm-16'>The Metric Dashboard brings all of your business insights under one roof. Revenue metrics, social, integrations - everything.</p>
           <br />
           <div className="">
             <button className="mg-btn-outline-primary"
             onClick={()=>goTo('/account/register')}
             style={{
               height:'50px',
               minWidth:'220px'
              }}
             >Get Started</button>
           </div>
        </div>
        <div className="col-6 col-md-12">
         <div className="mg-w-100 mg-vh-50 mg-rounded">
           <img src="/images/hero.png" alt="" className="mg-img-fluid mg-vh-50 mg-rounded" />
         </div>
        </div>
      </div><br />
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
