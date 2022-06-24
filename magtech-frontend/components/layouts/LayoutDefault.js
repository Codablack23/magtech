import Head from 'next/head'
import Footer from '../elements/Footer'
import NavBar from '../elements/Navbar'
export default function LayoutDefault({children,title,pageType}){
    return(
        <div className="mg-layout mg-bg-dark">
            <Head>
               <title>{title}</title>
            </Head>
            <NavBar pageType={pageType}/>
            <div>
                {children}
            </div>
           <Footer/>
        </div>
    )
}