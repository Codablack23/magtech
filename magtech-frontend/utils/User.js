const { default: axios } = require("axios")

function getEnv(){
    return {
      env:process.env.NEXT_PUBLIC_ENV,
      api:process.env.NEXT_PUBLIC_API_ENDPOINT
    }
  }
class User {
    api =`${getEnv().env == "production"?getEnv().api:"http://localhost:5000"}/users`
     config = {
        headers: {"Access-Control-Allow-Origin": "Set-Cookie"},
        withCredentials:true,
    }
    constructor(){}
    async login(user){
      return await axios.post(`${this.api}/login`,user,this.config)
      .then((res)=>{
        console.log(res.data)
        return {
            user:res.data.user,
            err:res.data.error
        }
      })
      .catch(err=>{
        return {
            error:"an error occured in the server",
            axios:err
        }
      })
    }
    async signUp(user){
        return await axios.post(`${this.api}/signup`,user,this.config)
        .then((res)=>{
          return {
              user:res.data.user,
              err:res.data.err
          }
        })
        .catch(err=>{
            return {
                error:"an error occured in the server",
                axios:err
            }
        })
    }
    async authenticateUser(){
        return await axios.post(`${this.api}`,{},this.config)
  
        .then(res=>{
            return {
                user:{email:res.data.email,refcode:res.data.ref_code},
                err:res.data.err
            }
        })
        .catch(err=>{
            return {
                error:"an error occured",
                axios:err
            }
        })
    }
    async logOut(){
        return await axios.post(`${this.api}/logout`,{},this.config)
        .then((res)=>{
          return {
              message:res.data.message,
              err:res.data.error
          }
        })
        .catch(err=>{
           return err
        })
    }
}

export default new User()