import DashboardLayout from "~/components/layouts/DashboardLayout"
import {Market} from "~/components/widgets/charts/chart"

export default function ChartPage(){
    return(
     <DashboardLayout title={"Charts"}>
      <div className="mg-bg-component mg-min-vh-100 mg-rounded" style={{marginTop:"20px"}}>
        <Market/>
      </div>
     </DashboardLayout>
    )
}