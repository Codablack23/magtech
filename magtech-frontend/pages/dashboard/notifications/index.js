import DashboardLayout from "~/components/layouts/DashboardLayout";

export default function DashoardNotificationPage(){
    const not = [1,2,,3,4,5]
    return(
        <DashboardLayout title={"Notification"}>
         <div className="">
            <h1 className="mg-text-center mg-text-warning mg-font-bold">Notifications</h1>
            {not.map(n=>(
                <div className="mg-min-vh-5 mg-bg-component mg-rounded" style={{marginTop:"20px",padding:"10px"}}>
                <div className="mg-d-flex mg-align-center">
                   <p>
                       <i className="bi bi-bell mg-text-grey mg-small-25"></i>
                   </p>
                   <div style={{marginLeft:"20px"}}>
                   <p className="mg-text-warning mg-small-13 mg-font-euclid mg-font-bold">Your Password was changed successfully</p>
                    <p className="mg-small-12 mg-text-disabled mg-font-bold">{ new Date().toDateString()}</p>
                   </div>
                </div>
               </div>
            ))}
         </div>
        </DashboardLayout>
    )
}