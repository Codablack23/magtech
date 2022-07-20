import {actionTypes} from "./actions"

export default function AuthReducer(state,action){
  switch (action.type) {
    case actionTypes.login:
      console.log(action.payload)
      return {
        isAuthenticated:true,
        user:action.payload.user
       }
    case actionTypes.logout:
       localStorage.removeItem("user")
        return {
            isAuthenticated:false,
            user:null
        }
     case actionTypes.register:
        return {
            isAuthenticated:true,
            user:action.payload.user
        }
    default:
        return state
  }
}