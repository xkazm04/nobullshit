'use client';
import { useState, useEffect } from 'react';
import TimerWidget from './TimerWidget';
import { PauseCircleIcon, PlayCircle, PlayCircleIcon, StopCircleIcon } from 'lucide-react';

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

const Timer = () => {
    
    const [totalSeconds, setTotalSeconds] = useState(120);
    const size= 80;
    const totalMilliseconds = totalSeconds * 1000;
    const circumference = size * Math.PI * 2;
    const [countdown, setCountdown] = useState(totalMilliseconds);
    const [cd, setCd] = useState({
      hours: Math.floor(countdown / 1000 / 60 / 60).toString().padStart(2, '0'), 
      minutes: Math.floor(countdown / 1000 / 60).toString().padStart(2, '0'),
      seconds:  Math.floor((countdown / 1000) % 60)})
    const [isRunning, setIsRunning] = useState(false);
    const [active, setActive] = useState(false);

    const activeTimer: Timer = {
      userId: 'user1', // Replace with actual user ID
      trackerId: 'tracker1', // Replace with actual tracker ID
      startDatetime: new Date(), // Current datetime
      currentDatetime: new Date(), // Current datetime
      endDatetime: new Date(Date.now() + totalMilliseconds), // Current datetime plus the duration of the timer
      state: 'running'
    };

    const getTimer = ({userId}:GetProps) => {
      // Get the timer from the database
      let activeTimerSeconds = activeTimer.endDatetime.getTime() - activeTimer.currentDatetime.getTime();
      let activeTimerTotalSeconds = Math.floor(activeTimerSeconds / 1000);
      setTotalSeconds(activeTimerTotalSeconds);
      startTimer()
    }

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
      setCd({hours: Math.floor(countdown / 1000 / 60 / 60).toString().padStart(2, '0'), minutes: Math.floor(countdown / 1000 / 60).toString().padStart(2, '0'), seconds:  Math.floor((countdown / 1000) % 60)})
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
          hours: Math.floor(countdown / 1000 / 60 / 60).toString().padStart(2, '0'),
          minutes: Math.floor(countdown / 1000 / 60).toString().padStart(2, '0'),
          seconds: Math.floor((countdown / 1000) % 60)
        });
      } 
    }, [countdown, isRunning]);
  

    const strokeDashoffset = (countdown / totalMilliseconds) * circumference;

    return <div className='flex flex-col justify-center items-center'>
      <TimerWidget/>
        <div className="relative w-64 h-64">
        <svg className={`absolute top-0 left-0 w-full h-full 
        ${countdown < 600 && 'animate-pulse' } `}>
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
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-2xl">
          {countdown <= 0 ? <div>You did it!</div> : <>{`${cd.hours}:${cd.minutes}:${cd.seconds < 10 ? '0' : ''}${cd.seconds}`}</>}
        </div>
      </div>
      <div className='flex flex-row gap-5'>
          <div><input
            type="number"
            className='input'
            value={totalSeconds}
            onChange={(e) => setTotalSeconds(Number(e.target.value))}
          />
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
               onClick={stopTimer}><PauseCircleIcon strokeWidth={1} size={30} color={'#fde047'}/></button>}
          </div>
          <div><button onClick={resetTimer}><StopCircleIcon strokeWidth={1} size={30} color='#fb7185'/></button></div>
      </div>
    </div>
}

export default Timer