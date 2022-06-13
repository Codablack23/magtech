import Head from "next/head"
import Link from "next/link"
import SideMenu from "~/components/elements/dashboard/SideMenu"
import {toggleSideMenu} from '~/helpers'

export default function DashboardLayout({children,title}){
    return(
        <div className="mg__dashboard-layout ">
            <Head>
                <title>Dashboard | {title}</title>
            </Head>
          <div className="mg-contain">
             <SideMenu/>
             <SideMenu isMobile={true}/>
             <div className="mg__dashboard-content mg-container-small">
                <header className="mg-text-white">
                    <p className="mg-small-18">Goodluck Edih</p>
                    <div className="mg__dashboard-actions">
                        <Link href={"/"}>
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