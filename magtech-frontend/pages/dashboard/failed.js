import { useRouter } from "next/router";
import DashboardLayout from "~/components/layouts/DashboardLayout";

export default function FailedCryptoCharge(){
    const Router = useRouter()
    return (
        <DashboardLayout title={"Failed Crypo Charge"}>
           <div className="mg-bg-component mg-text-center" style={{
            padding:"1em",
            marginInline:"auto",
            marginTop:"50px",
            maxWidth:400
            }}>
             <i className="bi bi-x-octagon mg-text-danger mg-small-50"></i>
             <h3 className="mg-text-white mg-font-bold mg-small-25">Payment Failed</h3>
             <p className="mg-text-white mg-small-12 ">Sorry Could not complete payment, charge has been declined, expired,  or was cancelled</p><br />
             <div className="mg-text-center">
             <button className="mg-btn-outline-white" style={{margin:"auto"}}
             onClick={()=>Router.push("/dashboard")}
             >Go to Dashboard</button>
             </div>
           </div>
        </DashboardLayout>
    )
}