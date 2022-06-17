import Link from "next/link"
import {toggleSideMenu} from '~/helpers'

const links = [
  {
    name:"Analytics",
    url:"/dashboard",
    icon:"bi bi-grid-fill",
  },
  {
    name:"Bots",
    url:"/dashboard/bots",
    icon:"bi bi-robot",
  },
  {
    name:"Withdrawals",
    url:"/dashboard/withdrawals",
    icon:"bi bi-arrow-repeat",
  },
  {
    name:"Charts",
    url:"/dashboard/charts",
    icon:"bi bi-graph-up-arrow",
  },
  {
    name:"Refferrals",
    url:"/dashboard/referrals",
    icon:"bi bi-gear",
  },

]

export default function SideMenu({isMobile,title,children}){
    return(
        <div className={`mg__dashboard-menu mg-card ${isMobile?"mobile":""}`} id={isMobile?"side-menu":""}>
            <div className="brand mg-bg-dark">
                {children}
            </div>
           <div className="mg__dashboard-links">
            {links.map(link=>(
                <Link href={link.url}>
                <a className={`mg__dashboard-link ${title===link.name?"active":null}`}>
                <i className={link.icon}></i>
                <span>{link.name}</span>
                </a>
              </Link>
            ))}
           </div>
           <div>
           <Link href={"/dashboard/settings"}>
               <a className="mg__dashboard-settings-link">
                <i className="bi bi-gear"></i>
                <span>Settings</span>
               </a>
             </Link>
           </div>
        </div>
    )
}