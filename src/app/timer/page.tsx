'use client';
import BottomNav from '../components/BottomNav';
import Timer from '../components/Timing/Timer';
import { useState } from 'react';
import Countdown from '../components/Timing/Countdown';
import HeaderComponent from '../components/ui/header';
import { Clock8Icon, TimerResetIcon } from 'lucide-react';

const Page = () => {
  const [type, setType] = useState('countdown' as string);
  return (
    <div className="page">
        <HeaderComponent page={type} />
          <div className='mt-[10%]'>
            {type === 'countdown' ? <Countdown /> : <Timer />}
          </div>
          <div className='absolute right-1 top-16'>
            <button 
              className={`btn-action ${type === 'countdown' ? 'bg-green-900/20' : ''}`} 
              onClick={()=>{setType('countdown')}}>
              {<Clock8Icon/>}
            </button>
          </div>
          <div className='absolute left-1 top-16'>
            <button 
              className={`btn-action ${type === 'timer' ? 'bg-green-900/20' : ''}`} 
              onClick={()=>{setType('timer')}}>{<TimerResetIcon/>}
            </button>
          </div>
        <div className='z-10 w-full'><BottomNav /></div>
    </div>
  );
};

export default Page;