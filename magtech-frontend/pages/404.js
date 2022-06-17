import LayoutDefault from "~/components/layouts/LayoutDefault";

export default function NotFound(){
    return(
        <LayoutDefault title={"404"} pageType={"account"}>
         <div className="mg-text-center mg-contain"
         style={{
            maxWidth:"400px"
         }}
         >
         <img src="/images/error.png" className="mg-w-100" alt="" />
         </div>
        </LayoutDefault>
    )
}