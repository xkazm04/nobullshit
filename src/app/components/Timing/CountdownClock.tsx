import { CheckCheckIcon } from "lucide-react";
import { useEffect, useState } from "react";

const CountdownClock = ({countdown, totalMilliseconds, cd,data,setCountdown,setTotalMiliseconds,setTotalSeconds}) => {
   
    const size = 80;
    const circumference = size * Math.PI * 2;
    let basicOffset = (countdown / totalMilliseconds) * circumference;
    const [strokeDashoffset, setStrokeDashoffset] = useState(basicOffset);
    const [cdId, setCdId] = useState(undefined);

    useEffect(() => {
        if (data){
            let elapsed = data.elapsed;
            let total = data.countdown;
            setCountdown(total-elapsed)
            let activeTimerMiliseconds = total * 1000;
            setTotalMiliseconds(activeTimerMiliseconds);
            setTotalSeconds(total);
            setStrokeDashoffset((activeTimerMiliseconds / totalMilliseconds) * circumference);
        }
    }, [countdown]);

    return       <div className="relative w-64 h-64">
      <svg className={`absolute top-0 left-0 w-full h-full 
      ${countdown < 600 && 'animate-pulse'} `}>
        <circle cx="50%" cy="50%" r="30%" stroke="gray" strokeWidth="2%" fill="transparent" />
        <circle
          cx="50%"
          cy="50%"
          r="30%"
          stroke="yellow"
          strokeWidth="1%"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>

      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
        {countdown <= 0 ? <div><CheckCheckIcon size={50} strokeWidth={1.3} color={'#86efac'}/></div> : 
        <div className='flex flex-col'>
        <div className='flex flex-row title-menu'>
            <div className='flex flex-row relative py-2'><div className='px-1'>{cd.hours}h</div></div>
            <div className='flex flex-row relative py-2'> <div className='pr-1'>{cd.minutes}m</div></div>
        </div>
           <div className='flex flex-row relative justify-center'> 
              <div className='pr-1 text-xl'>{cd.seconds < 10 ? '0' : ''}{cd.seconds}</div>
              <div className='text-xs absolute right-1'>s</div>
           </div>
        </div>
        }
      </div>

    </div>
}

export default CountdownClock