export function Modal({children,isShown,title,setIsShowing}){
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
              
              <div className="mg-modal-dialogue mg-round" style={{padding:"10px"}}>
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