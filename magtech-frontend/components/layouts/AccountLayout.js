import LayoutDefault from "./LayoutDefault";

export default function AccountLayout({children,title}){
    return(
        <LayoutDefault title={title} pageType={"account"}>
          {children}
        </LayoutDefault>
    )
}