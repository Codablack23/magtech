import User from "~/utils/User";
import AuthReducer from "./reducers";

const { createContext, useReducer,useEffect } = require("react");

export const AuthContext = createContext({
    isAuthenticated:false,
    user:null
})

export default function AuthContextProvider({children}){
    async function getUser(){
        const user = await User.authenticateUser()
        return user?{
            user:user.user,
            isAuthenticated:true
        }:{
                isAuthenticated:false,
                user:null
        }
    }
    const [authState,dispatch] = useReducer(AuthReducer,{},()=>{
        if(typeof window !== "undefined"){
            const auth = localStorage.getItem("auth")
            return auth?JSON.parse(auth):{
                isAuthenticated:false,
                user:null
            }
        }else{
          return getUser().then(data=>data)
        }
    })    
    
    useEffect(()=>{
      localStorage.setItem("auth",JSON.stringify(authState))
    },[authState])
    return(
        <AuthContext.Provider value={{authState,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}