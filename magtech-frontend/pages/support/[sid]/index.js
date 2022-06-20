import SupportDashboard from "~/components/layouts/SupportLayout";

export default function SupportHomePage(){
    return(
     <SupportDashboard title={"Chats"}>
        <div className="mg__support-home mg__chat-layout">
           <div className="mg__chat-users mg-bg-component mg-rounded"></div>
           <div className="mg__chatbox mg-bg-dark mg-rounded mg-bg-component">
             <div className="mg__chat-actions mg-bg-component mg-dark">
                <input type="text"
                placeholder="type message"
                className="mg-text-primary mg-bg-none"
                 />
                 <button className="mg-btn-dark">
                    <i className="bi bi-send mg-text-primary"></i>
                 </button>
             </div>
           </div>
        </div>
     </SupportDashboard>
    )
}