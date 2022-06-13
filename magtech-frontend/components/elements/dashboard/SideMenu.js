import Link from "next/link"
import {toggleSideMenu} from '~/helpers'

export default function SideMenu({isMobile}){
    return(
        <div className={`mg__dashboard-menu mg-card ${isMobile?"mobile":""}`} id={isMobile?"side-menu":""}>
            <div className="brand mg-bg-dark">
                 <p><i className="bi bi-bar-chart mg-small-22 mg-text-grey"></i></p>
                <p className="mg-small-22 mg-text-white">Magtech <span className="mg-text-grey mg-small-18">Dashboard</span></p>
                 <p className="bi bi-x-lg mg__close-side-menu mg-text-warning"
                 onClick={()=>{toggleSideMenu(-100)}}
                 ></p>
            </div>
           <div className="mg__dashboard-links">
             <Link href={"/dashboard"}>
               <a className="mg__dashboard-link">
                <i className="bi bi-grid-fill"></i>
                <span>Analytics</span>
               </a>
             </Link>
             <Link href={"/dashboard"}>
               <a className="mg__dashboard-link active">
                <i className="bi bi-robot"></i>
                <span>Bots</span>
               </a>
             </Link>
             <Link href={"/dashboard"}>
               <a className="mg__dashboard-link">
                <i className="bi bi-arrow-repeat"></i>
                <span>Withdrawals</span>
               </a>
             </Link>
             <Link href={"/dashboard"}>
               <a className="mg__dashboard-link">
                <i className="bi bi-graph-up-arrow"></i>
                <span>Charts</span>
               </a>
             </Link>
             <Link href={"/dashboard"}>
               <a className="mg__dashboard-link">
                <i className="bi bi-arrow-left-right"></i>
                <span>Refferrals</span>
               </a>
             </Link>
           </div>
           <Link href={"/dashboard"}>
               <a className="mg__dashboard-settings-link">
                <i className="bi bi-gear"></i>
                <span>Settings</span>
               </a>
             </Link>
        </div>
    )
}