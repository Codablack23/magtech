import Payments from "~/utils/Payment"

export async function getBalance(){
    const date = new Date()

    const investmentData = await Payments.getInvestments()
    const PaymentsData = await Payments.getPayments()
    const {withdrawals} = await Payments.getWithdrawals()
    const {refs} = await Payments.getRefs()
    const {bots} = await Payments.getBots()
    const p_total = PaymentsData.payments.filter(p=>p.status === "paid").reduce((total,p)=>(total +p.amount),0)
    const i_total =  investmentData.investments.filter(i=>{
            const expires = new Date(i.expires)
            const timeLeft = (expires - date) /(1000 * 60 * 60 * 24 )
            return timeLeft > 0
    }).reduce((a,b)=>(a + b.amount),0)
    const w_total =  withdrawals.filter(p=>p.status === "paid").reduce((a,b)=>(a + b.amount),0)
    const ref_total =  refs.reduce((a,b)=>(a + b.amount),0)
    const b_total = bots.reduce((a,b)=>(a + b.bot_price),0)
    const funds = p_total - i_total - w_total - ref_total - b_total
    const iTotal = investmentData.investments.reduce((a,b)=>{ 
        const expires = new Date(b.expires)
        let timeLeft = (expires - date) /(1000 * 60 * 60 * 24 )
        timeLeft = timeLeft < 0?1:timeLeft
        return a + ((b.amount * b.percentage_profit)/timeLeft)
    },0)
    return funds;
}

export const bots = [
    {
      name:"Bot 1",
      price:'5',
      profit:0.30,
      minDeposit:20,
      maxDeposit:50,
    },
    {
      name:"Bot 2",
      price:'8',
      profit:0.30,
      minDeposit:100,
      maxDeposit:200,
    },
    {
      name:"Bot 3",
      price:'15',
      profit:0.30,
      minDeposit:400,
      maxDeposit:500,
    },
    {
      name:"Bot 4",
      price:'30',
      profit:0.30,
      minDeposit:1000,
      maxDeposit:2000,
    },
    {
      name:"Bot 5",
      price:'100',
      profit:0.30,
      minDeposit:5000,
      maxDeposit:10000,
    },
    {
      name:"Bot 6",
      price:'200',
      profit:0.30,
      minDeposit:15000,
      maxDeposit:20000,
    },
  
  ]