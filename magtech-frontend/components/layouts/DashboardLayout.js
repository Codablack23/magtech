import { Skeleton } from "antd"
import Head from "next/head"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import SideMenu from "~/components/elements/dashboard/SideMenu"
import { AuthContext } from "~/context/auth/context"
import {toggleSideMenu} from '~/helpers'
import User from "~/utils/User"

export default function DashboardLayout({children,title}){
    const {authState,dispatch} = useContext(AuthContext)

    async function getUser(){
        const response = await User.authenticateUser()
        
        console.log(response.user)
        if(!response.user){
            location.assign("/account")
        }else{
           dispatch({
            type:"LOGIN_USER",
            payload:{user:response.user}})
        }
    }
    
    useEffect(() => {
      getUser()
    }, [])
    
    return(
        <div className="mg__dashboard-layout ">
            <Head>
                <title>Dashboard | {title}</title>
                <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
            </Head>
          <div className="mg-contain">
             <SideMenu title={title}>
                <p><i className="bi bi-bar-chart mg-small-22 mg-text-grey"></i></p>
                <p className="mg-small-22 mg-text-white">Magtech <span className="mg-text-grey mg-small-18">Dashboard</span></p>
                 <p className="bi bi-x-lg mg__close-side-menu mg-text-warning"
                 onClick={()=>{toggleSideMenu(-100)}}
                 >
                 </p>
             </SideMenu>
             <SideMenu isMobile={true} title={title}>
               <p><i className="bi bi-bar-chart mg-small-22 mg-text-grey"></i></p>
                <p className="mg-small-22 mg-text-white">Magtech <span className="mg-text-grey mg-small-18">Dashboard</span></p>
                 <p className="bi bi-x-lg mg__close-side-menu mg-text-warning"
                 onClick={()=>{toggleSideMenu(-100)}}
                 ></p>
             </SideMenu>
             <div className="mg__dashboard-content mg-container-small">
                <header className="mg-text-white mg-bg-dark">
                    <p className="">{authState.user && authState.user.email}</p>
                    <div className="mg__dashboard-actions">
                        <Link href={"/dashboard/notifications"}>
                        <a className="mg__notification-link">
                                <i className="bi bi-bell mg-small-22"></i>
                                <sup></sup>
                            </a>
                        </Link>
                        <p className="mg__open-side-menu"
                         onClick={()=>{toggleSideMenu(0)}}
                        >
                          <i className="bi bi-justify mg-small-20"></i>
                        </p>
                    </div>
                </header>
                {children}
             </div>
          </div>
        </div>
      
    )
}