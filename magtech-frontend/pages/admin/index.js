import Head from "next/head";

export default function AdminLoginPage(){
    return(
      <div className="mg-layout-default">
       <Head>
        <title>Admin</title>
       </Head>
        
        <form action="" className="mg__admin-form mg-bg-component">
            <h1 className="mg-text-center mg-text-primary">Administrator</h1><br /><br />

            <div className="input-group">
                <label htmlFor="Username">Username</label>
                <input type="text" />
            </div><br />
            <div className="input-group">
                <label htmlFor="Username">Password</label>
                <div className="input-field">
                <input type="password" />
                </div>
            </div><br />

            <button className="mg-btn-primary mg-w-100">Login</button>
        </form>
      </div>
    )
}