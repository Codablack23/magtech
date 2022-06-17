import AdminLayout from "~/components/layouts/AdminLayout";

export default function AdminHomePage(){
  return(
    <AdminLayout title={"Stats"}>
      <div className="row mg-vh-40">
        <div className="col-12 mg-bg-component mg-rounded"></div>
      </div><br />
      <div className="row">
        <div className="col-6 col-sm-12 mg-bg-component mg-vh-40  mg-rounded">

        </div>
        <div className="col-6 col-sm-12 mg-bg-component mg-vh-40  mg-rounded">
          
        </div>
      </div><br />
      <div className="row mg-vh-40">
        <div className="col-12 mg-bg-component mg-rounded"></div>
      </div><br />
    </AdminLayout>
  )
}