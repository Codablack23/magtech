import Head from "next/head";
import AdminSideBar from "../widgets/dashbaord/AdminSideBar";
import {toggleAdminSideMenu} from '~/helpers'

export default  function AdminLayout({title,children}){
 return(
    <main className="mg-layout-default mg-bg-dark">
    <Head>
       <title>Admin | {title}</title>
    </Head>
    <AdminSideBar title={title}/>
    <AdminSideBar isMobile={true} title={title}/>
      <div className="mg__admin-content"
      >
        <div className="mg__admin-header mg-bg-dark">
            <p className="mg-small-20 mg-text-primary mg-font-bold">Hello Admin</p>
            <div className="mg__admin-header-actions">
              <p><i className="bi bi-bell mg-text-grey mg-small-20"></i>
              <sup></sup>
              </p>
              <span className="mg-show-md mg-pointer"
              onClick={()=>toggleAdminSideMenu(0)}
              ><i className="bi bi-justify mg-text-primary mg-small-20"></i></span>
            </div>
        </div>
       {children}
    </div>
   </main>
 )
}