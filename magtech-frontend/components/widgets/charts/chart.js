export function Market(){
  return(
    <div className="mg-w-100 mg-vh-90">
      <iframe src="/iframe_src/market.html" className="mg-w-100 mg-min-vh-100"  frameborder="0"></iframe>r
    </div>
  )
}

export function TickerTapeWidget(){
  return(
    <div className="mg-w-100 mg-vh-10">
      <iframe src="/iframe_src/tickertape.html" className="mg-w-100"  frameborder="0"></iframe>
    </div>
  )
}
export function FullChart(){
  return(
    <div className="mg-w-100 mg-min-vh-100" style={{overflow:"hidden"}}>
    <iframe src="/iframe_src/fullchart.html" className="mg-w-100 mg-min-vh-100" style={{padding:'16px',overflow:"hidden"}}  frameborder="0"></iframe>r
  </div>
  )
}

export function Snaps(){
  return(
  <div className="mg-w-100">
    <iframe src="/iframe_src/snaps.html" className="mg-w-100 mg-vh-100" style={{padding:'16px',overflow:"hidden"}}  frameborder="0"></iframe>r
  </div>
  )
}