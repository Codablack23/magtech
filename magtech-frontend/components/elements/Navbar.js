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
    const closeNav=()=>{
        const navbar = document.querySelector('#navbar')
        navbar.style.maxHeight = null;
    }
    const scrollToSection=(e,sectionName)=>{
        const section = document.querySelector(`#${sectionName}`)  
       section.scrollIntoView(true)
       closeNav()
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
                onClick={(e)=>scrollToSection(e,'pricing')}
                > Pricing</p>
                :null
            }
            {pageType!=="account"?
                <p className="mg-nav-links mg-text-primary"
                onClick={(e)=>scrollToSection(e,'how-it-works')}
                > How it works</p>
                :null
            }
            {pageType !== "account"?
            
              <p className="mg-nav-links mg-text-primary"
              onClick={(e)=>scrollToSection(e,'contact')}
              > Contact us</p>
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