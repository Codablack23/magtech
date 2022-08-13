import { useEffect } from "react"

export default function ChatBot(){
   useEffect(() => {    
   }, [])
    return(
        <div className="mg__support-chat">
        <iframe src="/iframe_src/chat.html" className="mg-w-100"  frameBorder="0" 
        id="iframe"
        ></iframe>
        </div>
    )
}