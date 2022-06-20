import Link from "next/link"
import {toggleSupportSideMenu} from '~/helpers'

const addAdminIdToLinks =(id)=>{
    const url = `/support/${id}`
    const links = [
        {
            name:"Chats",
            url:`${url}/`,
        },
        {
            name:"Settings",
            url:`${url}/settings`,
        },
    ]

        return links
}
   

export default function SupportSideBar({title,isMobile}){
    const links = addAdminIdToLinks(1)
    return(
        <nav className="mg__support-sidebar mg-bg-component mg-card" id={isMobile?"support-sidebar":null}>
           <header className="mg-bg-primary">
            <p className="mg-small-20">Support</p>
            <p className="mg-close mg-show-md"
            onClick={()=>toggleSupportSideMenu(-100)}
            >
                <i className="bi bi-x-circle"></i>
            </p>
           </header>
           <aside className="mg-support-links">
            {links.map(link=>(
                <Link href={link.url}>
                 <a className={`mg-support-link ${link.name===title?"active":""}`}>{link.name}</a>
                </Link>
            ))}
          </aside>
          <Link href={`/support/${1}/logout`}>
                 <a className={`mg-support-logout-link mg-bg-primary`}>
                    <i className="bi bi-box-arrow-left mg-font-bold"></i>
                    <span>Log Out</span>
                 </a>
          </Link>
        </nav>
    )
}