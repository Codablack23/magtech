import Link from 'next/link'
export default function NavBar({pageType}){
    return(
        <nav className="mg-nav mg-container mg-bg-component">
            <Link href={'/'}>
            <a className="mg-nav-brand mg-text-primary">MAGTECH</a>
            </Link>
            <div className="mg-navbar mg-navbar-right">
            {pageType !== "account"?
                <Link href={"/"}>
                <a className="mg-nav-links mg-text-primary"> Pricing</a>
               </Link>:null
            }
            {pageType!=="account"?
                <Link href={"/"}>
                <a className="mg-nav-links mg-text-primary"> How it works</a>
               </Link>:null
            }
            {pageType !== "account"?
              <Link href={"/"}>
              <a className="mg-nav-links mg-text-primary"> Contact us</a>
             </Link>:null

            }
             <Link href={"/account/"}>
              <a className="mg-nav-links mg-text-primary">Login</a>
             </Link>
             <Link href={"/account/register"}>
              <a className="mg-nav-links mg-text-white mg-bg-primary mg-rounded"> Register</a>
             </Link>
            </div>
        </nav>
    )
}