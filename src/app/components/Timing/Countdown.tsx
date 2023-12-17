'use client';
import { useState, useEffect } from 'react';
import TimerWidget from './TimerWidget';
import { ArrowDown, ArrowUp, CheckCheckIcon, PauseCircleIcon, PlayCircleIcon, Trash2Icon } from 'lucide-react';
import { Dialog } from '../ui/dialog';
import Modal from '../Modal';
import MusicSelector from './MusicSelector';
import MusicStarter from './MusicStarter';
import { decrementHours, decrementMinutes, incrementHours, incrementMinutes } from '@/app/lib/timeFns';

interface Timer {
  userId: string; // The ID of the user who owns the timer
  trackerId: string; // The ID of the tracker associated with the timer
  startDatetime: Date; // The datetime when the timer was started
  currentDatetime: Date; // The current datetime
  endDatetime: Date; // The datetime when the timer is set to end
  state: 'running' | 'stopped' | 'completed'; // The current state of the timer
}

type GetProps = {
  userId: string,
}

const CdExample = {
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "start_datetime": "2022-01-01T00:00:00",
  "end_datetime": "2022-01-01T01:00:00"
}

const Countdown = () => {

  const [totalSeconds, setTotalSeconds] = useState(120);
  const size = 80;
  const totalMilliseconds = totalSeconds * 1000;
  const circumference = size * Math.PI * 2;
  const [countdown, setCountdown] = useState(totalMilliseconds);
  const [cd, setCd] = useState({
    hours: Math.floor(countdown / 1000 / 60 / 60),
    minutes: Math.floor(countdown / 1000 / 60),
    seconds: Math.floor((countdown / 1000) % 60)
  })
  const [isRunning, setIsRunning] = useState(false);
  const [active, setActive] = useState(false);
  const strokeDashoffset = (countdown / totalMilliseconds) * circumference;

  const activeTimer: Timer = {
    userId: 'user1', // Replace with actual user ID
    trackerId: 'tracker1', // Replace with actual tracker ID
    startDatetime: new Date(), // Current datetime
    currentDatetime: new Date(), // Current datetime
    endDatetime: new Date(Date.now() + totalMilliseconds), // Current datetime plus the duration of the timer
    state: 'running'
  };

  const getTimer = ({ userId }: GetProps) => {
    // Get the timer from the database
    let activeTimerSeconds = activeTimer.endDatetime.getTime() - activeTimer.currentDatetime.getTime();
    let activeTimerTotalSeconds = Math.floor(activeTimerSeconds / 1000);
    setTotalSeconds(activeTimerTotalSeconds);
    startTimer()
  }

  // Online timer + CRUD operations + Notification + Tracker connection + Music randomizzer

  const pauseBeTimer = () => {
    // Pause the timer, set new currentDatetime and state to 'stopped
    console.log('Timer paused')
  }

  const deactivateBeTimer = () => {
    // Set the timer state to 'completed'
    console.log('Timer deactivated')
  }

  const startTimer = () => {
    setIsRunning(true);
    setActive(true);
  }

  const stopTimer = () => {
    setIsRunning(false);
  }

  const resetTimer = () => {
    setIsRunning(false);
    setActive(false);
    setCountdown(totalMilliseconds);
    setCd({ hours: Math.floor(countdown / 1000 / 60 / 60), minutes: Math.floor(countdown / 1000 / 60), seconds: Math.floor((countdown / 1000) % 60) })
  }

  useEffect(() => {
    if (isRunning && countdown > 0) {
      localStorage.setItem('timerState', JSON.stringify({ countdown, isRunning, active }));
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 10);
      }, 10);
      return () => clearInterval(interval);
    } else {
      setIsRunning(false);
    }
  }, [countdown, isRunning]);

  useEffect(() => {
    if (isRunning && countdown > 0) {
      setCd({
        hours: Math.floor(countdown / 1000 / 60 / 60),
        minutes: Math.floor(countdown / 1000 / 60),
        seconds: Math.floor((countdown / 1000) % 60)
      });
    }
  }, [countdown, isRunning]);

  const renderDialog = () => {
    return <Modal title='Add some music' description='via YT music' content={<MusicSelector/>}/>
  }

  return <div className='flex flex-col justify-between items-center h-full'>
    <TimerWidget />
    <Dialog>
      <div className="relative w-64 h-64">
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
                <div className='text-xs absolute right-3'>s</div>
             </div>
          </div>
          }
        </div>
      </div>
      <div className='typo-long'>Set your time goal</div>
      <div className='flex flex-row gap-5 py-5'>
      <div>
        <button onClick={() => incrementHours({hrs: cd.hours, setHrs: setCd({hours: cd.hours + 1, minutes: cd.minutes, seconds: cd.seconds})})}>
          <ArrowUp size={16}/>
        </button>
        h
        <button onClick={() => decrementHours({hrs: cd.hours, setHrs: setCd({hours: cd.hours - 1, minutes: cd.minutes, seconds: cd.seconds})})}>
          <ArrowDown size={16}/>
        </button>
        </div>
        <div>
        <div className='flex flex-row justify-between'>
          <button onClick={() => incrementMinutes({mins: cd.minutes, setMins: setCd({hours: cd.hours, minutes: cd.minutes + 1, seconds: cd.seconds})})}>
            <ArrowUp size={16}/>
          </button>
          min
          <button onClick={() => decrementMinutes({mins: cd.minutes, setMins: setCd({hours: cd.hours, minutes: cd.minutes - 1, seconds: cd.seconds})})}>
            <ArrowDown size={16}/>
          </button>
        </div>
        </div>
      </div>
      <div className='flex flex-row gap-5'>
        <div>
          {!isRunning ?
            <button onClick={startTimer}><PlayCircleIcon strokeWidth={1} size={30} color={'#86efac'}
              className='animate-fadeIn transition-all duration-500 ease-in-out'
            /></button> :
            <button
              className='animate-fadeIn transition-all duration-500 ease-in-out'
              onClick={stopTimer}><PauseCircleIcon strokeWidth={1} size={30} color={'#fde047'} /></button>}
        </div>
        <div><button onClick={resetTimer}><Trash2Icon strokeWidth={1} size={30} color={'#fb7185'} /></button></div>
      </div>
      {!active && <MusicStarter/>}
      {renderDialog()}
      {countdown === 0 && <div className='typo-long'>Save - {totalSeconds}</div>}
    </Dialog>
  </div>
}

export default Countdown