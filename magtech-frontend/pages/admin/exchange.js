import AdminLayout from "~/components/layouts/AdminLayout";
import Admin from "~/utils/Admin";
import {notification, Spin} from 'antd'
import {useEffect,useState} from 'react'

function Rates({exchange,setExchange,isEditable,setIsEditable,onSend,currency,updateInfo}){
    const [isLoading,setIsLoading]= useState(false)

    async function updateRates(){
      const data ={
        rate:exchange,
        conversion:updateInfo.conversion,
        type:updateInfo.type
      }
      setIsLoading(true)
      const response = await Admin.changeRate(data)
      setIsLoading(false)
      if(response.status === "success"){
         notification.success({
            message:<h3 className="mg-text-white">Success</h3>,
            className:"mg-bg-dark",
            description:<p className="mg-text-white">{response.message}</p>
         })
         onSend()
      }
      else{
        const error_message = <p className="mg-text-danger">{response.error}</p>
        if(response.status === "field error"){
             error_message = <div>{response.error.map(err=><p className="mg-text-danger">{err.error}</p>)}</div>
        }
        notification.success({
            message:<h3 className="mg-text-white">Failed</h3>,
            className:"mg-bg-dark",
            description:error_message
         })
      }
      setIsEditable(false)
    }
    const showEditable =(condition)=>condition?{border:"1px solid #303030"}:{border:"none"};
    return(
        <li  className="mg-d-flex mg-justify-between mg-align-center mg-rounded mg-bg-dark">
        <p className="mg-font-bold mg-font-euclid">1USD</p>
        <div className="mg-font-euclid mg-font-bold mg-d-flex mg-align-center mg-w-40">
        {currency.toUpperCase()}<input 
        type="number" 
         className="mg-font-bold mg-bg-none mg-w-60"
         value={exchange} 
         min={150}
         onChange={(e)=>{setExchange(e.target.value)}}
         readOnly = {!isEditable}
         style={showEditable(isEditable)}
         />
        </div>
        <div>
        <div className="mg-text-primary" style={{cursor:"pointer"}} >
            {isEditable?
             <>
             {isLoading?<Spin/>
             :<i className="bi bi-box-arrow-right mg-text-primary" onClick={updateRates}></i>
             }
             </>
            :<i className="bi bi-pencil mg-text-primary" onClick={()=>{setIsEditable(true)}}></i>
            }
        </div>
        </div>
    </li>  
    )
}
export default function AdminUsersPage(){
const [isLoading,setIsLoading] = useState(false)
const [exchange1,setExchange1] = useState(650);
const [exchange2,setExchange2] = useState(0.97);
const [exchange3,setExchange3] = useState(620);
const [exchange4,setExchange4] = useState(1.1);
const [isEditable1,setIsEditable1] = useState(false)
const [isEditable2,setIsEditable2] = useState(false)
const [isEditable3,setIsEditable3] = useState(false)
const [count,setCount] = useState(0)
const [isEditable4,setIsEditable4] = useState(false)

async function getPayments(){
  setIsLoading(true)
  const {exchanges} = await Admin.getRates()
  exchanges.forEach(element => {
   if(element.conversion === "USD_NGN" && element.rate_type === "payment"){
     setExchange1(element.rate)
   }
   if(element.conversion === "USD_NGN" && element.rate_type === "withdrawal"){
    setExchange3(element.rate)
  }
   if(element.conversion === "USD_EUR" && element.rate_type === "payment"){
    setExchange2(element.rate)
  }

  if(element.conversion === "USD_EUR" && element.rate_type === "withdrawal"){
    setExchange4(element.rate)
  }
  });

  setIsLoading(false)
}

useEffect(() => {
  getPayments()
}, [count])

  return(
    <AdminLayout title={"Users"}>
      <br />
      <div>
       <p className="mg-small-20 mg-text-primary mg-font-bold mg-font-euclid mg-text-center">Exchange</p><br />

      <div className="row">
        <div className="col-md-12 col-6">
          <div className="mg-bg-component mg-min-vh-30 mg-rounded" style={styles.box}>
             <p className="mg-text-grey"><b><small>Payment</small></b></p><br />
             <ul className="mg-exchange-list mg-text-grey">
                <Rates 
                 exchange={exchange1}
                 isEditable={isEditable1} 
                 setExchange={setExchange1} 
                 setIsEditable={setIsEditable1}
                 currency={"NGN"}
                 updateInfo={{conversion:"USD_NGN",type:"payment"}}
                 onSend={()=>setCount(prev=>prev + 1)}
                 />
                <Rates 
                 exchange={exchange2}
                 isEditable={isEditable2}
                 setExchange={setExchange2}
                 setIsEditable={setIsEditable2}
                 currency={"EUR"}
                 updateInfo={{conversion:"USD_EUR",type:"payment"}}
                 onSend={()=>setCount(prev=>prev + 1)}
                 />
             </ul>
          </div>
        </div>
        <div className="col-md-12 col-6">
          <div className="mg-bg-component mg-min-vh-30 mg-rounded" style={styles.box}>
          <p className="mg-text-grey"><b><small>Withdrawal</small></b></p><br />
          <ul className="mg-exchange-list mg-text-grey">
               <Rates 
                 exchange={exchange3}
                 isEditable={isEditable3}
                 setExchange={setExchange3}
                 setIsEditable={setIsEditable3}
                 currency={"NGN"}
                 updateInfo={{conversion:"USD_NGN",type:"withdrawal"}}
                 onSend={()=>setCount(prev=>prev + 1)}
                 />
               <Rates 
                 exchange={exchange4}
                 isEditable={isEditable4}
                 setExchange={setExchange4}
                 setIsEditable={setIsEditable4}
                 updateInfo={{conversion:"USD_EUR",type:"withdrawal"}}
                 currency={"EUR"}
                 onSend={()=>setCount(prev=>prev + 1)}
                 />
             </ul>
          </div>
        </div>
      </div>
  
      </div>
    </AdminLayout>
  )
}

const styles = {
  box:{maxWidth:"500px",margin:"auto",padding:"10px"}
}