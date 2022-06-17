import Head from "next/head"
import Link from "next/link"
import SideMenu from "~/components/elements/dashboard/SideMenu"
import {toggleSideMenu} from '~/helpers'

export default function DashboardLayout({children,title}){
    //  new TradingView.widget(
  //       {
  //       "symbol": "NASDAQ:AAPL",
  //       "timezone": "Etc/UTC",
  //       "theme": "dark",
  //       "style": "1",
  //       "locale": "en",
  //       "toolbar_bg": "#f1f3f6",
  //       "enable_publishing": false,
  //       "withdateranges": true,
  //       "range": "YTD",
  //       "hide_side_toolbar": false,
  //       "allow_symbol_change": true,
  //       "details": true,
  //       "container_id": "tradingview_796e4"
  //     }
  //   )
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
                    <p className="mg-small-18">Goodluck Edih</p>
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