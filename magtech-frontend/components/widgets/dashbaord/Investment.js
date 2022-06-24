import { Progress } from "antd"

export default function Investment(){
    return(
        <div className="mg-bg-dark mg-rounded mg__investment">
        <div className="mg__investment-desc mg-font-euclid mg-text-grey ">
            <p className="head mg-font-euclid mg-font-bold">$14300.234</p>
            <p className="head mg-font-euclid mg-font-bold">$0.003</p>
        </div>
        <p className="mg-text-grey">Bot 1</p>
        <p className="mg-text-grey">+0.003% daily profit</p>
        <div className="mg-w-90">
        <Progress type="line" strokeColor={"#fcd535"} 
         width={170}
         trailColor="#181a20"
         percent={60}
         format={percent=><p className="mg-text-grey">{percent * 0.01 * 60}/60 days</p>}
          />
        </div>
      </div>
    )
}