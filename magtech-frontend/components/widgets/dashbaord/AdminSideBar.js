import Link from "next/link"
import {toggleAdminSideMenu} from '~/helpers'

const addAdminIdToLinks =(id)=>{
 const url = `/admin`
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
          superUser:true
        },      
        {
          name:"Exchange",
          url:`${url}/exchange`,
          superUser:true
        },
        {
          name:"Change Password",
          url:`${url}/change-password`,
        }
    ]

    return links
}

export default function AdminSideBar({title,isMobile,admin}){
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
            {links.filter(link=>!link.superUser).map(link=>(
                <Link href={link.url} legacyBehavior>
                 <a className={`mg-admin-link ${link.name===title?"active":""}`}>{link.name}</a>
                </Link>
            ))}
             {admin.isSuperUser?links.filter(link=>(link.superUser)).map(link=>(
                <Link href={link.url} legacyBehavior>
                 <a className={`mg-admin-link ${link.name===title?"active":""}`}>{link.name}</a>
                </Link>
            )):null}
          </aside>
        </nav>
    )
}