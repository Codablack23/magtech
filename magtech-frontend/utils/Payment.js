import { config } from "~/helpers";
import axios from "axios";

function getEnv(){
    return {
      env:process.env.NEXT_PUBLIC_ENV,
      api:process.env.NEXT_PUBLIC_API_ENDPOINT
    }
  }

class Payments{
    api =`${getEnv().env == "production"?getEnv().api:"http://localhost:5000"}`
    
    async startPayment(payment_data){
        return await axios.post(`${this.api}/bots/add-payment`,payment_data,config)
        .then((res)=> res.data)
        .catch(err=>{
         return {
             axios_err:err,
             error:'couldn\'t connect with server please try again later',
         }
        })
     }
    
    async completePayment(id){
        return await axios.post(`${this.api}/bots/add-payment/${id}`,{},config)
        .then((res)=> res.data)
        .catch(err=>{
         return {
             axios_err:err,
             error:'couldn\'t connect with server please try again later',
         }
        })
    }
    async makeInvestment(investment_data){
        return await axios.post(`${this.api}/bots/invest`,investment_data,config)
        .then((res)=> res.data)
        .catch(err=>{
         return {
             axios_err:err,
             error:'couldn\'t connect with server please try again later',
         }
        })
    }
    async buyBot(data){
        return await axios.post(`${this.api}/bots/buy`,data,config)
        .then(res=>res.data)
        .catch(err=>{
            return {
                axios_err:err,
                error:'couldn\'t connect with server please try again later',
            }
           })
    }
    async getBots(){
        return await axios.post(`${this.api}/bots/`,{},config)
        .then(res=>res.data)
        .catch(err=>{
            return {
                axios_err:err,
                error:'couldn\'t connect with server please try again later',
            }
           })
    }
    async getInvestments(){
        return await axios.post(`${this.api}/bots/investments`,{},config)
        .then(res=>res.data)
        .catch(err=>{
            return {
                axios_err:err,
                error:'couldn\'t connect with server please try again later',
            }
           })
    }
    async getPayments(){
        return await axios.post(`${this.api}/bots/payments`,{},config)
        .then(res=>res.data)
        .catch(err=>{
            return {
                axios_err:err,
                error:'couldn\'t connect with server please try again later',
            }
           })
    }
    async getWithdrawals(){
        return await axios.post(`${this.api}/withdrawals/`,{},config)
        .then(res=>res.data)
        .catch(err=>{
            return {
                axios_err:err,
                error:'couldn\'t connect with server please try again later',
            }
           })
    }
    async requestWithdrawal(data){
        return await axios.post(`${this.api}/withdrawals/withdraw`,data,config)
        .then(res=>res.data)
        .catch(err=>{
            return {
                axios_err:err,
                error:'couldn\'t connect with server please try again later',
            }
           })
    }
}

export default new Payments()