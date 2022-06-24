export default function WithdrawalForm(){
    return(
        <form className="mg__withdrawal-form mg-text-grey">
        <div className="mg-input-group mg-w-100">
            <label htmlFor="account">Account Number</label>
            <div className="mg-input-field mg-input-field-disabled-light mg-w-100">
                <input type="text" />
            </div>
        </div>
        <div className="mg-input-group">
            <label htmlFor="account">Amount</label>
            <div className="mg-input-field mg-input-field-disabled-light mg-w-100">
            <input type="text" />
            <select>
                <option value="NGN">NGN</option>
                <option value="NGN">USD</option>
            </select>
            </div>
        </div>
        <div className="mg-input-group">
            <label htmlFor="account">Account Name</label>
            <div className="mg-input-field mg-input-field-disabled-light mg-w-100">
             <input type="text" />
            </div>
        </div>

        <div className="mg-input-group">
            <label htmlFor="account">Bank</label>
            <div className="mg-input-field mg-input-field-disabled-light mg-w-100">
             <select className="mg-w-100"></select>
            </div>
        </div><br />

        <button className="mg-btn-outline-warning mg-w-50">Withdraw</button>
     </form>
    )
}