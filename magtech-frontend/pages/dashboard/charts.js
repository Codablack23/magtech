import DashboardLayout from "~/components/layouts/DashboardLayout"
import Chart from "~/components/widgets/global/charts/charts"

export default function ChartPage(){
    return(
     <DashboardLayout title={"Charts"}>
      <div className="mg-bg-component mg-min-vh-85 mg-rounded" style={{marginTop:"20px"}}>
        <Chart/>
      </div>
     </DashboardLayout>
    )
}