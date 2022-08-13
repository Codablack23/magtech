import { notification, Spin } from "antd"
import { useEffect, useState } from "react"
import Payment from "~/utils/Payment"
import { validateWithdrawFields } from "~/utils/validate"
const FW_TEST = process.env.NEXT_PUBLIC_FW_TEST

export default function WithdrawalForm({amount}){
    const [errors,setErrors] = useState({})
    const [bankType,setBankType] = useState("NGN")
    const [country,setCountry] = useState("")
    const [countries,setCountries] = useState([])
    const [routing_number,setRoutingNumber] = useState("")
    const [swift_code,setSwiftCode] = useState("")
    const [currency,setCurrency] = useState("NGN")
    const [fullAddr,setFullAddr] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const [accountDetails,setAccountDetails] = useState({
        acct_name:"",
        acct_number:"",
        acct_bank:""
    })
    const [names,setNames] = useState({
        first_name:"",
        last_name:""
    })
    const [address,setAddress] = useState({
        street_name:"",
        street_number:0,
        postal_code:"",
        city:""
    })
  
    function handleAccountDetails(e){
        setAccountDetails(prev=>{
            let addr = {...prev}
            addr[e.target.id] = e.target.value
            return addr
        })
    }
    function handleAddress(e){
        setAddress(prev=>{
            let addr = {...prev}
            addr[e.target.id] = e.target.value
            return addr
        })
    }
    function handleNames(e){
        setNames(prev=>{
            let addr = {...prev}
            addr[e.target.id] = e.target.value
            return addr
        })
    }
    async function getCountries(){
        const res = await fetch('https://restcountries.com/v3.1/all')
        const country_result = await res.json()
        const allCountries = country_result.map(c=>{
            return {
                name:c.name.common,
                symbol:c.cca2
            }
        })
        setCountries(allCountries)

    }
    async function getBanks(country){
        
       const res = await fetch(`https://api.flutterwave.com/v3/banks/${country}`,{
        mode:"cors",
        headers:{
            "Authorization":`Bearer ${FW_TEST}`,            
        }
       })
       setBanks(res.data)
    }

    function handleSelectCountry(e){
        setCountry(e.target.value)
        // getBanks(country)
    }
    function handleChangeBankType(e){
        setBankType(e.target.value)
        switch(bankType){
            case "NGN":
                setCurrency("NGN")
            break;
            case "NGN_USD":
                setCurrency("USD")
            break;
            case "USD":
                setCurrency("USD")
            break;
            default:
                setCurrency("EUR")
             break
        }
    }
    useEffect(()=>{
       getCountries()
    },[])

    async function handleWithdraw(e){
        e.preventDefault()
        const details={
            account_name:accountDetails.acct_name,
            account_type:bankType,
            account_number:accountDetails.acct_number.toString(),
            bank:accountDetails.acct_bank,
            currency,
            firstname:names.first_name,
            lastname:names.last_name,
            country,
            routing_number,
            swift_code,
            address:fullAddr,
            street_name:address.street_name,
            street_no:address.street_number.toString(),
            postal_code:address.postal_code,
            city:address.city,
            amount:amount.toString()
        }
      

      const fieldErrors = validateWithdrawFields(details)
      const errObj = {}
      fieldErrors.forEach(err=>{
        errObj[err.field] = err.error
      })
      setErrors(errObj)
      if(fieldErrors.length === 0){
        setIsLoading(true)
        const withdrawStatus = await Payment.requestWithdrawal(details)
        setIsLoading(false)
        if(withdrawStatus.details){
            notification.success({
                message:<h2>Withdraw Success</h2>,
                description:<p>{withdrawStatus.message}</p>
            })
        }else{
            notification.success({
                message:<h2>Withdraw Failed</h2>,
                description:<p>{withdrawStatus.error}</p>
            })
        }
      }

    }
    return(
        <form className="mg__withdrawal-form mg-text-grey">
        <div className="mg-input-group mg-w-100">
            <label htmlFor="account">Account Number</label>
            <div className={`mg-input-field mg-input-field-${errors["account_number"]?"danger":"disabled-light"} mg-w-100`}>
                <input type="number"
                  className="mg-w-75"
                  value={accountDetails.acct_number}
                  id="acct_number"
                  onChange={handleAccountDetails}
                />
                <select value={currency} onChange={(e)=>setCurrency(e.target.value)} className="mg-w-25 mg-bg-component">
                   <option value="NGN">NGN</option>
                   {/* <option value="USD">USD</option>
                   <option value="EUR">EUR</option> */}
                </select>
            </div>
            <p className="mg-small-12 mg-text-danger">{errors.account_number}</p>
        </div>

        <div className="mg-input-group">
        <label htmlFor="account">Account Type</label>
            <div className={`mg-input-field mg-input-field-${errors["account_type"]?"danger":"disabled-light"} mg-w-100`}>
            <select value={bankType} 
            onChange={handleChangeBankType}
            className="mg-w-100 mg-text-grey mg-bg-component">
                <option value="NGN">Naira Account</option>
                {/* <option value="NGN_USD">NGN Dom Account</option>
                <option value="USD">US Account</option>
                <option value="EUR">EUR and GBP account</option> */}
            </select>
            </div>
            <p className="mg-small-12 mg-text-danger">{errors.account_type}</p>
        </div>
        <div className="mg-input-group">
            <label htmlFor="account">Account Name</label>
            <div className={`mg-input-field mg-input-field-${errors["account_name"]?"danger":"disabled-light"} mg-w-100`}>
             <input type="text" 
               value={accountDetails.acct_name}
               id="acct_name"
               onChange={handleAccountDetails}
             />
            </div>
            <p className="mg-small-12 mg-text-danger">{errors.account_name}</p>
        </div>
        <div className="mg-input-group">
            <label htmlFor="account">Bank</label>
            <div  className={`mg-input-field mg-input-field-${errors.bank_name?"danger":"disabled-light"} mg-w-100`}>
            <input type="text"
              value={accountDetails.acct_bank}
              id="acct_bank"
              onChange={handleAccountDetails}
            />
             {/* <select className="mg-w-100" value={bank} onChange={(e)=>setBank(e.target.value)}>
             <option value="">Select country</option>
                {banks.length >0?
                 banks.map(b=>(
                    <option key={b.name} value={b.name}>{b.name}</option>
                 ))
                :null}
             </select> */}
            </div>
            <p className="mg-small-12 mg-text-danger">{errors.bank_name}</p>
        </div>
        <div className="mg-input-group">
        <label htmlFor="account">Country</label>
            <div className={`mg-input-field mg-input-field-${errors.country?"danger":"disabled-light"} mg-w-100`}>
            <select value={country} 
            onChange={handleSelectCountry}
            className="mg-w-100 mg-text-grey mg-bg-component">
                <option value="">Select country</option>
                {countries.length >0?
                 countries.map(c=>(
                    <option key={c.symbol} value={c.symbol}>{c.name}</option>
                 ))
                :null}
            </select>
            </div>
            <p className="mg-small-12 mg-text-danger">{errors.country}</p>
        </div>
       {/* {bankType === "NGN_USD"?
       <>
        <div className="mg-input-group">
            <label htmlFor="account">First Name</label>
            <div  className={`mg-input-field mg-input-field-${errors.first_name?"danger":"disabled-light"} mg-w-100`}>
             <input type="text"
             value={names.first_name}
             id="first_name"
             onChange={handleNames}
             />
            </div>
            <p className="mg-small-12 mg-text-danger">{errors.first_name}</p>
        </div>
        <div className="mg-input-group">
            <label htmlFor="account">Last Name</label>
            <div  className={`mg-input-field mg-input-field-${errors.last_name?"danger":"disabled-light"} mg-w-100`}>
             <input type="text" 
               value={names.first_name}
               id="last_name"
               onChange={handleNames}
             />
            </div>
            <p className="mg-small-12 mg-text-danger">{errors.last_name}</p>
        </div>
       </>
       :null}
       {bankType ==="USD" || bankType === "EUR"?
      <>
      <div className="mg-input-group">
          <label htmlFor="account">Swiftcode</label>
          <div  className={`mg-input-field mg-input-field-${errors.swift_code?"danger":"disabled-light"} mg-w-100`}>
           <input type="text"
           value={swift_code}
           onChange={(e)=>setSwiftCode(e.target.value)}
           />
          </div>
          <p className="mg-small-12 mg-text-danger">{errors.swift_code}</p>
      </div>
      <div className="mg-input-group">
          <label htmlFor="account">Routing Number</label>
          <div  className={`mg-input-field mg-input-field-${errors.routing_number?"danger":"disabled-light"} mg-w-100`}>
           <input type="number"
           value={routing_number}
           onChange={(e)=>setRoutingNumber(e.target.value)}
           />
          </div>
          <p className="mg-small-12 mg-text-danger">{errors.routing_number}</p>
      </div>

      {bankType === "EUR"?
      <>
      <div className="mg-input-group">
          <label htmlFor="account">City</label>
          <div  className={`mg-input-field mg-input-field-${errors.city?"danger":"disabled-light"} mg-w-100`}>
           <input type="text"
           value={address.city}
           id="city"
           onChange={handleAddress}
           />
          </div>
      </div>
      <p className="mg-small-12 mg-text-danger">{errors.city}</p>
      <div className="mg-input-group">
          <label htmlFor="account">Street Name</label>
          <div  className={`mg-input-field mg-input-field-${errors.street_name?"danger":"disabled-light"} mg-w-100`}>
           <input type="text" 
             value={address.street_name}
             id="street_name"
             onChange={handleAddress}
           />
          </div>
          <p className="mg-small-12 mg-text-danger">{errors.street_name}</p>
      </div>
      <div className="mg-input-group">
          <label htmlFor="account">Street Number</label>
          <div  className={`mg-input-field mg-input-field-${errors.street_number?"danger":"disabled-light"} mg-w-100`}>
           <input type="number"
             value={address.street_number}
             id="street_number"
             onChange={handleAddress}
           />
          </div>
          <p className="mg-small-12 mg-text-danger">{errors.street_number}</p>
      </div>
      <div className="mg-input-group">
          <label htmlFor="account">Postal Code</label>
          <div  className={`mg-input-field mg-input-field-${errors.postal_code?"danger":"disabled-light"} mg-w-100`}>
           <input type="number"
             value={address.postal_code}
             id="postal_code"
             onChange={handleAddress}
           />
          </div>
          <p className="mg-small-12 mg-text-danger">{errors.postal_code}</p>
      </div>
      </>
      :(
       <div className="mg-input-group">
        <label htmlFor="account">Address</label>
        <div  className={`mg-input-field mg-input-field-${errors.address?"danger":"disabled-light"} mg-w-100`}>
         <input type="text" 
         value={fullAddr}
          onChange ={(e)=>setFullAddr(e.target.value)} />
        </div>
        <p className="mg-small-12 mg-text-danger">{errors.address}</p>
      </div>
      )}      
     </>
       :null} */}
        <br />
        {!isLoading
         ?<button type="button" className="mg-btn-warning mg-w-100 mg-font-weight" onClick={handleWithdraw}>Continue</button>
         :<button type="button" className="mg-btn-warning mg-w-100 mg-font-weight">
            <Spin/>
         </button>
        }
     </form>
    )
}