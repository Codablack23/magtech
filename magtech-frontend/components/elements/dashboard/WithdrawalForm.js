import { useEffect, useState } from "react"
const FW_TEST = process.env.NEXT_PUBLIC_FW_TEST

export default function WithdrawalForm(){
    
    const [bankType,setBankType] = useState("NGN")
    const [country,setCountry] = useState("")
    const [countries,setCountries] = useState([])
    const [routing_number,setRoutingNumber] = useState("")
    const [swift_code,setSwiftCode] = useState("")
    const [currency,setCurrency] = useState("NGN")
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
    return(
        <form className="mg__withdrawal-form mg-text-grey">
        <div className="mg-input-group mg-w-100">
            <label htmlFor="account">Account Number</label>
            <div className="mg-input-field mg-input-field-disabled-light mg-w-100">
                <input type="number"
                  className="mg-w-75"
                  value={accountDetails.acct_number}
                  id="acct_number"
                  onChange={handleAccountDetails}
                />
                <select value={currency} onChange={(e)=>setCurrency(e.target.value)} className="mg-w-25 mg-bg-component">
                   <option value="NGN">NGN</option>
                   <option value="USD">USD</option>
                   <option value="EUR">EUR</option>
                </select>
            </div>
        </div>
        <div className="mg-input-group">
        <label htmlFor="account">Account Type</label>
            <div className="mg-input-field mg-input-field-disabled-light mg-w-100">
            <select value={bankType} 
            onChange={handleChangeBankType}
            className="mg-w-100 mg-text-grey mg-bg-component">
                <option value="NGN">Naira Account</option>
                <option value="NGN_USD">NGN Dom Account</option>
                <option value="USD">US Account</option>
                <option value="EUR_GBP">EUR and GBP account</option>
            </select>
            </div>
        </div>
        <div className="mg-input-group">
            <label htmlFor="account">Account Name</label>
            <div className="mg-input-field mg-input-field-disabled-light mg-w-100">
             <input type="text" 
               value={accountDetails.acct_name}
               id="acct_name"
               onChange={handleAccountDetails}
             />
            </div>
        </div>
        <div className="mg-input-group">
            <label htmlFor="account">Bank</label>
            <div className="mg-input-field mg-input-field-disabled-light mg-w-100">
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
        </div>
        <div className="mg-input-group">
        <label htmlFor="account">Country</label>
            <div className="mg-input-field mg-input-field-disabled-light mg-w-100">
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
        </div>
        <div className="mg-input-group">
            <label htmlFor="account">First Name</label>
            <div className="mg-input-field mg-input-field-disabled-light mg-w-100">
             <input type="text"
             value={names.first_name}
             id="first_name"
             onChange={handleNames}
             />
            </div>
        </div>
        <div className="mg-input-group">
            <label htmlFor="account">Last Name</label>
            <div className="mg-input-field mg-input-field-disabled-light mg-w-100">
             <input type="text" 
               value={names.first_name}
               id="last_name"
               onChange={handleNames}
             />
            </div>
        </div>
       {bankType ==="USD" || bankType === "EUR_GBP"?
      <>
      <div className="mg-input-group">
          <label htmlFor="account">Swiftcode</label>
          <div className="mg-input-field mg-input-field-disabled-light mg-w-100">
           <input type="text"
           value={swift_code}
           onChange={(e)=>setSwiftCode(e.target.value)}
           />
          </div>
      </div>
      <div className="mg-input-group">
          <label htmlFor="account">Routing Number</label>
          <div className="mg-input-field mg-input-field-disabled-light mg-w-100">
           <input type="number"
           value={routing_number}
           onChange={(e)=>setRoutingNumber(e.target.value)}
           />
          </div>
      </div>

      {bankType === "EUR_GBP"?
      <>
      <div className="mg-input-group">
          <label htmlFor="account">City</label>
          <div className="mg-input-field mg-input-field-disabled-light mg-w-100">
           <input type="text"
           value={address.city}
           id="city"
           onChange={handleAddress}
           />
          </div>
      </div>
      <div className="mg-input-group">
          <label htmlFor="account">Street Name</label>
          <div className="mg-input-field mg-input-field-disabled-light mg-w-100">
           <input type="text" 
             value={address.street_name}
             id="street_name"
             onChange={handleAddress}
           />
          </div>
      </div>
      <div className="mg-input-group">
          <label htmlFor="account">Street Number</label>
          <div className="mg-input-field mg-input-field-disabled-light mg-w-100">
           <input type="number"
             value={address.street_number}
             id="street_number"
             onChange={handleAddress}
           />
          </div>
      </div>
      <div className="mg-input-group">
          <label htmlFor="account">Postal Code</label>
          <div className="mg-input-field mg-input-field-disabled-light mg-w-100">
           <input type="number"
             value={address.postal_code}
             id="postal_code"
             onChange={handleAddress}
           />
          </div>
      </div>
      </>
      :(
       <div className="mg-input-group">
        <label htmlFor="account">Address</label>
        <div className="mg-input-field mg-input-field-disabled-light mg-w-100">
         <input type="text" />
        </div>
      </div>
      )}      
     </>
       :null}
        <br />

        <button className="mg-btn-warning mg-w-100 mg-font-weight">Continue</button>
     </form>
    )
}