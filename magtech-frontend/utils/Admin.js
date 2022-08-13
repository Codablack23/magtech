import { config } from "~/helpers";
import axios from "axios";

function getEnv(){
  return {
    env:process.env.NEXT_PUBLIC_ENV,
    api:process.env.NEXT_PUBLIC_API_ENDPOINT
  }
}

class Admin {

    api = `${getEnv().env == "production"?getEnv().api:"http://localhost:5000"}/superusers`
    async authenticate(){
        return await axios.post(`${this.api}`,{},config)
  
        .then(res=>{
            console.log(res.data)
            return {
                admin:{username:res.data.username,admin_id:res.data.admin_id},
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
    async getPayments(){
        return await axios.post(`${this.api}/admin/payments`,{},config)
        .then(res=>res.data)
        .catch(err=>{
            return {
                axios_err:err,
                error:'couldn\'t connect with server please try again later',
            }
        })
    }
    async getUsers(){
        return await axios.post(`${this.api}/admin/users`,{},config)
        .then(res=>res.data)
        .catch(err=>{
            return {
                axios_err:err,
                error:'couldn\'t connect with server please try again later',
            }
        })
    }
    async getWithdrawals(){
        return await axios.post(`${this.api}/admin/withdrawals`,{},config)
        .then(res=>res.data)
        .catch(err=>{
            return {
                axios_err:err,
                error:'couldn\'t connect with server please try again later',
            }
        })
    }
    
    async getAdmins(){
        return await axios.post(`${this.api}/admin/all`,{},config)
        .then(res=>res.data)
        .catch(err=>{
            return {
                axios_err:err,
                error:'couldn\'t connect with server please try again later',
            }
        })
    }
    async loginAdmin(data){
        return await axios.post(`${this.api}/admin`,data,config)
        .then(res=>res.data)
        .catch(err=>{
            return {
                axios_err:err,
                error:'couldn\'t connect with server please try again later',
            }
        })
    }
    async getRates(){
        return await axios.post(`${this.api}/exchanges`,{},config)
        .then(res=>res.data)
        .catch(err=>{
            return {
                axios_err:err,
                error:'couldn\'t connect with server please try again later',
            }
        })
    }
    async changeRate(data){
        return await axios.post(`${this.api}/update-exchange`,data,config)
        .then(res=>res.data)
        .catch(err=>{
            return {
                axios_err:err,
                error:'couldn\'t connect with server please try again later',
            }
        })
    }
    async getInvestments(){
        return await axios.post(`${this.api}/admin/investments`,{},config)
        .then(res=>res.data)
        .catch(err=>{
            return {
                axios_err:err,
                error:'couldn\'t connect with server please try again later',
            }
        })
    }
    
}

export default new Admin()