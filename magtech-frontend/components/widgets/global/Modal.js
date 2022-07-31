export function Modal({children,isShown,title,setIsShowing,useDefault,className}){
    function Title(){
      return(
        <>{title}</>
      )
    }
    if(isShown){
        return(
            <div className="mg-modal">
                <button className="mg-modal-close" onClick={()=>setIsShowing(false)}>
                    <i className="bi bi-x-lg"></i>
                </button>
              
              <div  className={`${useDefault !== true?"mg-modal-dialogue":className} mg-round`} style={{padding:"10px"}}>
                  <Title/><br />
                  {children}
              </div>
            </div>
          )
    }
    else{
        return null
    }
}