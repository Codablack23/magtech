import { config } from "~/helpers";
import axios from "axios";

class Payments{
    api = "http://localhost:5000/bots"
    
    async startPayment(payment_data){
        return await axios.post(`${this.api}/add-payment`,payment_data,config)
        .then((res)=> res.data)
        .catch(err=>{
         return {
             axios_err:err,
             error:'couldn\'t connect with server please try again later',
         }
        })
     }
    
    async completePayment(id){
        return await axios.post(`${this.api}/add-payment/${id}`,{},config)
        .then((res)=> res.data)
        .catch(err=>{
         return {
             axios_err:err,
             error:'couldn\'t connect with server please try again later',
         }
        })
    }
    async makeInvestment(investment_data){
        return await axios.post(`${this.api}/invest`,investment_data,config)
        .then((res)=> res.data)
        .catch(err=>{
         return {
             axios_err:err,
             error:'couldn\'t connect with server please try again later',
         }
        })
    }
    async buyBot(data){
        return await axios.post(`${this.api}/buy`,data,config)
        .then(res=>res.data)
        .catch(err=>{
            return {
                axios_err:err,
                error:'couldn\'t connect with server please try again later',
            }
           })
    }
    async getBots(){
        return await axios.post(`${this.api}/`,{},config)
        .then(res=>res.data)
        .catch(err=>{
            return {
                axios_err:err,
                error:'couldn\'t connect with server please try again later',
            }
           })
    }
    async getInvestments(){
        return await axios.post(`${this.api}/investments`,{},config)
        .then(res=>res.data)
        .catch(err=>{
            return {
                axios_err:err,
                error:'couldn\'t connect with server please try again later',
            }
           })
    }
    async getPayments(){
        return await axios.post(`${this.api}/payments`,{},config)
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