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
            status:res.data.status,
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
              status:res.data.status,
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
    async authenticateUser(){
        return await axios.post(`${this.api}`,{},this.config)
  
        .then(res=>{
          console.log(res)
            return {
                status:res.data.status,
                user:res.data.user,
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
              status:res.data.status,
              message:res.data.message,
              err:res.data.error
          }
        })
        .catch(err=>{
           return err
        })
    }
    async startPasswordChange(){
        return await axios.post(`${this.api}/change-password`,{},this.config)
        .then((res)=>{
          return {
              message:res.data.message,
              err:res.data.err,
              status:res.data.status,
              url:res.data.url
          }
        })
        .catch(err=>{
           return err
        })
    }
    async changePassword(details){
     
        return await axios.post(`${this.api}/change-password/${details.reset_code}`,{
            new_password:details.new_password
        },this.config)
        .then((res)=>{
          return {
              status:res.data.status,
              message:res.data.message,
              err:res.data.error?res.data.error:""
          }
        })
        .catch(err=>{
           return err
        })
    }
    async forgotPassword({email}){
        return await axios.post(`${this.api}/forgot-password/`,{email},this.config)
        .then(({data})=>{
          return {
            status:data.status,
            message:data.message,
            err:data.error,
            url:data.url
          }
        })
        .catch(err=>{
           return err
        })
    }
    async resetPassword(details){
        return await axios.post(`${this.api}/reset-password/`,details,this.config)
        .then(({data})=>{
          return {
              status:data.status,
              message:data.message,
              err:data.err,
            
          }
        })
        .catch(err=>{
           return err
        })
    }
}

export default new User()