import Link from "next/link"
import {toggleSideMenu} from '~/helpers'
import {Modal} from 'antd'
import User from "~/utils/User"
import { useState } from "react"
const links = [
  {
    name:"Analytics",
    url:"/dashboard",
    icon:"bi bi-house",
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
  // {
  //   name:"Charts",
  //   url:"/dashboard/charts",
  //   icon:"bi bi-graph-up-arrow",
  // },
  {
    name:"Refferrals",
    url:"/dashboard/referrals",
    icon:"bi bi-people",
  },
  {
    name:"Invest",
    url:"/dashboard/bots/invest",
    icon:"bi bi-graph-up-arrow",
  },
]
 function Button(){
  async function logout(){
    await User.logOut()
    window.location.assign("/account")
  }
  return(
    <button className="mg-btn-sq-warning mg-w-25" style={{marginRight:"10px"}}
        onClick={logout}  >Yes</button>
  )
 }
 function LogoutModal({setIsShowing}){
  return(
    <div className="mg-bg-component mg-text-grey mg-text-center" style={{padding:"8px"}}>
      <h3  className="mg-small-20 mg-font-bold mg-font-euclid mg-text-warning">Confirm Logout</h3>
      <p>Are you sure you want to logout</p><br />
      <div className="mg-d-flex mg-w-100 mg-justify-center">
        <Button/>
        <button className="mg-btn-outline-sq-warning mg-w-25"
        onClick={()=>{setIsShowing(false)}}
        >No</button>
      </div>
    </div>
  )
 }
export default function SideMenu({isMobile,title,children}){
  const [isShowing,setIsShowing] = useState(false)
    return(
        <div className={`mg__dashboard-menu mg-card ${isMobile?"mobile":""}`} id={isMobile?"side-menu":""}>
            <div className="brand mg-bg-dark">
                {children}
            </div>
           <div className="mg__dashboard-links">
            {links.map(link=>(
                <Link href={link.url} key={link.name}>
                <a className={`mg__dashboard-link ${title===link.name?"active":null}`}>
                <i className={link.icon}></i>
                <span className="mg__link-text">{link.name}</span>
                </a>
              </Link>
            ))}
                <a className={`mg__dashboard-link`}
                 onClick={()=>setIsShowing(true)}
                >
                <i className={"bi bi-box-arrow-left"}></i>
                <span className="mg__link-text">Logout</span>
                </a>
           </div>
           <div>
           <Link href={"/dashboard/settings"} >
               <a className="mg__dashboard-settings-link mg__link-text">
                <i className="bi bi-gear"></i>
                <span>Settings</span>
               </a>
             </Link>
           </div>
           <Modal 
            onCancel={()=>setIsShowing(false)}
            visible={isShowing}
            bodyStyle={{background:"#181a20"}}
            footer={null}
           >
            <LogoutModal setIsShowing={setIsShowing}/>
           </Modal>
        </div>
    )
}