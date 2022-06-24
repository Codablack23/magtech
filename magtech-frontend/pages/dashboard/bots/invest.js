import Link from "next/link";
import DashboardLayout from "~/components/layouts/DashboardLayout";

export default function InvestPage(){
    return(
        <DashboardLayout title={"Bots"}>          
             <form className="mg__investment-page mg-bg-component mg-rounded  mg-text-grey">
                <p className="mg-font-euclid mg-small-22 mg-font-bold mg-small-md-18 mg-text-center mg-text-warning">Make Investment</p><br />

                <div className="mg-input-group">
                    <label htmlFor="">Amount</label>
                    <div className="mg-input-field mg-input-field-disabled">
                        <input className="mg-w-95" type={"number"}/>
                    </div>
                </div>
                <div className="mg-input-group">
                    <label htmlFor="">Select Bot ID</label>
                    <div className="mg-input-field mg-input-field-disabled">
                        <select name="" className="mg-w-95" id=""></select>
                    </div>
                </div>

                <p className="mg-small-12" style={{margin:"1em 0"}}>I agree to <Link href={"/"}><a className="mg-text-disabled mg-small-12">Terms</a></Link> and <Link href={"/"}><a  className="mg-text-disabled mg-small-12">Conditions</a></Link>  by making this investment</p>
                <button className="mg-btn-warning mg-w-100 mg-case-capital">Continue</button>
             </form>
        </DashboardLayout>
    )
}