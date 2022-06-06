import Link from 'next/link'
export default function NavBar({pageType}){
    const openNav=()=>{
        const navbar = document.querySelector('#navbar')
        if(navbar.style.maxHeight){
            navbar.style.maxHeight = null
        }
        else{
            navbar.style.maxHeight = "70vh"
        }
    }
    const scrollToSection=(sectionName)=>{
        const section = document.querySelector(`#${sectionName}`)
        console.log(section.scrollTop)
        // window.scrollTo(section.scrollTop)
    }
    return(
        <nav className="mg-nav mg-container mg-bg-component">
            <div className="mg-navbrand-container mg-w-md-100 mg-d-flex mg-align-center mg-justify-between">
            <Link href={'/'}>
            <a className="mg-nav-brand mg-text-primary">MAGTECH</a>
            </Link>
            <p className='mg-open-nav' onClick={openNav}>
                <i className="bi bi-justify mg-font-25 mg-text-primary"></i>
            </p>
            </div>
            <div className="mg-navbar mg-navbar-right" id='navbar'>
            {pageType !== "account"?
                <p className="mg-nav-links mg-text-primary"
                onClick={()=>scrollToSection('pricing')}
                > Pricing</p>
                :null
            }
            {pageType!=="account"?
                <p className="mg-nav-links mg-text-primary"> How it works</p>
                :null
            }
            {pageType !== "account"?
              <p className="mg-nav-links mg-text-primary"> Contact us</p>
              :null

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