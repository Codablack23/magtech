export default function AccountContainer({children,Page}){
    return(
        <div className="mg-account-container mg-bg-component">
            <h2 className="mg-account-title mg-text-warning mg-text-center mg-small-30">{Page}</h2><br />
          {children}
        </div>
    )
}