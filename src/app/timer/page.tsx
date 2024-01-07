'use client';
import Timer from '../components/Timing/Timer';
import { useState } from 'react';
import Countdown from '../components/Timing/Countdown';
import HeaderComponent from '../components/ui/header';
import { Clock8Icon, TimerResetIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Page = () => {
  const [type, setType] = useState('countdown' as string);
  const MenuItem = ({setActiveChoice, choice, label, icon}) => {
    return <div 
        onClick={() => { setActiveChoice(choice) }}
        className={`menu-item flex ${type === choice ? 'text-main' : 'text-gray-400'}`}>
    <div>{icon}</div>
    <div> {label}</div>
    <AnimatePresence>
    {type === choice && 
    <motion.div 
            initial={{opacity:0, x:-100}}
            animate={{opacity:1, x:0}}
            exit={{opacity:0, x:100}}
            className="absolute bottom-0 left-0 w-full h-[1px] bg-main"/>}
    </AnimatePresence>
    </div>
}
  return (
    <div className="page justify-start">
        <HeaderComponent page={type} />
          <div className="flex flex-row w-full mt-[10%]">
            <MenuItem setActiveChoice={setType} choice={'countdown'} label={'Countdown'} icon={<Clock8Icon size={14}/>} />
            <MenuItem setActiveChoice={setType} choice={'timer'} label={'Timer'} icon={<TimerResetIcon size={14}/>}/>
          </div>
          <div className='h-full'>
            {type === 'countdown' ? <Countdown /> : <Timer />}
          </div>
    </div>
  );
};

export default Page;