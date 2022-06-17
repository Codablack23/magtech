import Link from "next/link"
import {toggleAdminSideMenu} from '~/helpers'

const addAdminIdToLinks =(id)=>{
 const url = `/admin/${id}`
 const links = [
        {
          name:"Stats",
          url:`${url}/`,
        },
        {
          name:"Payments and Invoices",
          url:`${url}/payments`,
        },
        {
            name:"Withdrawals",
            url:`${url}/withdrawals`,
          
          },
        {
          name:"Users",
          url:`${url}/users`,
        },
        {
          name:"Admins",
          url:`${url}/admins`,
        },      
        {
          name:"Support Team",
          url:`${url}/support`,
        },
        {
            name:"Messages",
            url:`${url}/`,
          },
    ]

    return links
}

export default function AdminSideBar({title,isMobile}){
   const links = addAdminIdToLinks(1)
    return(
        <nav className="mg__admin-sidebar mg-bg-component" id={isMobile?"admin-sidebar-mobile":""}>
          <header className="mg-bg-primary">
            <p className="mg-small-22">Administrator</p>
            <p className="mg-close mg-show-md mg-pointer"
              onClick={()=>toggleAdminSideMenu(-100)}
            >
                <i className="bi bi-x-circle"></i>
            </p>
          </header>
          <aside className="mg-admin-links">
            {links.map(link=>(
                <Link href={link.url}>
                 <a className={`mg-admin-link ${link.name===title?"active":""}`}>{link.name}</a>
                </Link>
            ))}
          </aside>
        </nav>
    )
}