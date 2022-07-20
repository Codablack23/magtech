export default function Payment({payment}){
    const date = new Date(payment.createdAt)
    return(
    <li>
        <div className="">
            <p className="mg-text-grey mg-font-bold amount">{payment.amount}</p>
            <p className="mg-text-warning"></p>
        </div>
        <div>
        <p className="mg-text-grey">{date.toDateString()}</p>
        </div>
        <div>
            <p className="mg-btn-outline-warning">Paid</p>
        </div>
    </li>
    )
}