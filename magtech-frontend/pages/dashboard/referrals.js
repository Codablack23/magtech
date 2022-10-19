import { notification ,Spin} from "antd";
import { useContext, useEffect, useState } from "react";
import DashboardLayout from "~/components/layouts/DashboardLayout";
import Investment from "~/components/widgets/dashbaord/Investment";
import { AuthContext } from "~/context/auth/context";
import Payment from "~/utils/Payment";

const Referrals =({refree})=>{
    const date = new Date(refree.createdAt)
    return(
    <li>
        <div className="">
            <p className="mg-text-warning">{refree.first_gen} (1st gen)</p>
            {refree.second_gen?<p className="mg-text-grey">{refree.second_gen} (2nd gen)</p>:null}
        </div>
        <div>
        <p className="mg-text-grey">{date.toDateString()}</p>
        </div>
    </li>
    )
}
export default function DashboardReferralsPage(){
    const {authState} = useContext(AuthContext)
    const [url,setUrl] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const [refs,setRefs] = useState([])
    const [refTotal,setRefTotal] = useState(0) 

    async function getInit(){
        setIsLoading(true)
        const response = await Payment.getRefs()
        console.log(response)
        if(response.refs){
            setRefs(response.refs)

            console.log(response)
        }
        setIsLoading(false)
    }
    useEffect(() => { 
      setUrl(window.location.origin)
      getInit()
      setRefTotal(refs.reduce((total,a)=>
      {return total + a.amount},
      0))
    }, [])
 
    function copyText(){
     const copiedText = document.getElementById("ref_link")
     copiedText.select()
     copiedText.setSelectionRange(0,999)

     navigator.clipboard.writeText(copiedText.value)
     notification.success({
        message:<p className="mg-text-white">link copied to clip board</p>,
        className:'mg-bg-component mg-card'
     })

    }
    return(
        <DashboardLayout title={"Refferrals"}>
         <div className="">
            <div className="row" style={{marginTop:"20px"}}>
                <div className="col-7 col-md-12 mg-min-vh-30 mg-bg-component mg-rounded mg-font-euclid">
                  <p className="mg-small-20 mg-text-white mg-font-bold" > Referral Link </p><br />
                  <div className="mg-input-field mg-input-field-disabled mg-text-grey">
                    <input 
                    type="text"
                    id="ref_link"
                    className="mg-w-95"
                     value={url && (`${url}/account/register?refcode=${authState?authState.user.refcode:""}`)}
                    readOnly/>
                  </div>
                  <button
                   className="mg-btn-warning mg-text-dark" 
                  style={{margin:"1em 0"}}
                  onClick={copyText}
                  >Copy Link
                  </button>
                </div>
                <div className="col-5 col-md-12 mg-text-center mg-center mg-min-vh-30 mg-bg-component mg-rounded mg-font-euclid  mg-font-bold">
                <p className="mg-small-20 mg-text-white"> Referral Bonus </p>
                <p className="mg-text-warning mg-small-35 mg-font-euclid mg-small-18">${refTotal}</p>
                </div>
            </div>
            <div className="mg-min-vh-50 mg-bg-component mg-rounded" style={{marginTop:"20px"}}>
              <heading className="mg-d-flex mg-justify-between" style={{padding:"10px"}}>
                   <p className="mg-small-23 mg-font-euclid 
                      mg-text-white
                      mg-font-bold
                      mg-text-center
                      ">Referrals</p>
                    <p style={{margin:"0.7em 0.5em"}}>
                    {isLoading && (<Spin/>)}
                   </p>
               </heading>
             <ul className="mg__payment-list">
                { refs.length > 0 ? refs.map(ref=><Referrals refree={ref}/>)
                :<h3 className="mg-text-disabled mg-text-center">No Referrals Made</h3>
                }
             </ul>
            </div>
         </div>
        </DashboardLayout>
    )
}