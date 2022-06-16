import DashboardLayout from "~/components/layouts/DashboardLayout";

export default function DashboardHome(){
    return(
        <DashboardLayout title={"Analytics"}>
         <div className="mg__dashboard-analytics">
            <div className="row" style={{marginTop:"20px"}}>
                <div className="col-7 col-md-12 mg-min-vh-30 mg-bg-component mg-rounded">

                </div>
                <div className="col-5 col-md-12 mg-min-vh-30 mg-bg-component mg-rounded">

                </div>
            </div>
            <div className="mg-min-vh-50 mg-bg-component mg-rounded" style={{marginTop:"20px"}}>

            </div>
         </div>
        </DashboardLayout>
    )
}