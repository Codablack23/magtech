export default function Payment(){
    const date = new Date()
    return(
    <li>
        <div className="">
            <p className="mg-text-grey mg-font-bold amount">$300</p>
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