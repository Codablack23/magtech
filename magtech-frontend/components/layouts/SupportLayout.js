import Head from "next/head";
import SupportSideBar from "../widgets/dashbaord/SupportSideBar";
import {toggleSupportSideMenu} from '~/helpers'

export default function SupportDashboard({children,title}){
    return(
        <div className="mg-layout-default">
        <Head>
            <title>
                Support | {title}
            </title>
            <link rel="shortcut icon" href="/images/logo.png" type="image/x-icon" />
        </Head>
        <SupportSideBar title={title}/>
        <SupportSideBar title={title} isMobile={true}/>
        <div className="mg__support-content mg-container-small">
            <header className="mg-support-header mg-bg-dark">
                <p className="mg-small-22 mg-font-bold mg-text-grey">John Doe</p>
                <p className="mg-pointer mg-show-md"
                   onClick={()=>toggleSupportSideMenu(0)}
                >
                    <i className="bi bi-justify mg-text-primary mg-small-20"></i>
                </p>
            </header>
            {children}
        </div>
        </div>
    )
}