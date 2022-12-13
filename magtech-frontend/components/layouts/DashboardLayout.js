import {Spin} from "antd"
import RatesProvider from '~/context/payments/rateContext'
import Head from "next/head"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import SideMenu from "~/components/elements/dashboard/SideMenu"
import { AuthContext } from "~/context/auth/context"
import User from "~/utils/User"

export default function DashboardLayout({children,title}){
    const {authState,dispatch} = useContext(AuthContext)
    const [isLoading,setIsLoading] = useState(true)

    async function getUser(){
        const response = await User.authenticateUser()
        
        console.log(response.user)
        if(!response.user || response.user.username === undefined){
            window.location.assign("/account")
        }else{
          setIsLoading(false)
           dispatch({
            type:"LOGIN_USER",
            payload:{user:response.user}})
        }
    }
    
    useEffect(() => {
      getUser()
    
    }, [])
    
    return(
        <RatesProvider>
        <div className="mg__dashboard-layout ">
            <Head>
                <title>Dashboard | {title}</title>
            </Head>
          <div className="mg-contain">
             <SideMenu title={title}>
               <div className="mg__link-text">
                <Link href={"/"}>
                <a className="mg-small-22 mg-text-white">Magtech <span className="mg-text-grey mg-small-18">Dashboard</span></a>
                </Link>
                </div>
             </SideMenu>
                <div className="mg__dashboard-content mg-container-small">
                <header className="mg-text-white mg-bg-dark">
                    <p className="mg-small-14">{authState.user && authState.user.email}</p>
                    <div className="mg__dashboard-actions">
                        {/* <Link href={"/dashboard/notifications"}>
                        <a className="mg__notification-link">
                                <i className="bi bi-bell mg-small-22"></i>
                                <sup></sup>
                            </a>
                        </Link> */}
                        <Link href={"/dashboard/settings"} >
                        <p className="mg__open-side-menu" style={{marginTop:"4px"}}>
                          <i className="bi bi-gear mg-small-20"></i>
                        </p>
                        </Link>
                    </div>
                </header>
                {isLoading
                ?<div className="mg-d-flex mg-justify-center mg-align-center mg-w-100 mg-vh-95">
                    <Spin size="large"/>
                </div>
                :children
                }
             </div>
          </div>
        </div>
        </RatesProvider>
    )
}