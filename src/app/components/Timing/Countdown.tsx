'use client';
import { useState, useEffect } from 'react';
import TimerWidget from './TimerWidget';
import { ArrowDown, ArrowUp, CheckCheckIcon, PauseCircleIcon, PlayCircleIcon, Trash2Icon } from 'lucide-react';
import { Dialog } from '../ui/dialog';
import Modal from '../Modal';
import MusicSelector from './MusicSelector';
import MusicStarter from './MusicStarter';
import { decrementHours, decrementMinutes, incrementHours, incrementMinutes } from '@/app/lib/timeFns';
import { apiGetSingleItem, apiRequest } from '@/app/lib/callers';

interface Timer {
  userId: string; // The ID of the user who owns the timer
  trackerId: string; // The ID of the tracker associated with the timer
  startDatetime: Date; // The datetime when the timer was started
  currentDatetime: Date; // The current datetime
  endDatetime: Date; // The datetime when the timer is set to end
  state: 'running' | 'stopped' | 'completed'; // The current state of the timer
}


const CdExample = {
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "countdown": 120
}

const Countdown = () => {

  const [totalSeconds, setTotalSeconds] = useState(120);
  const size = 80;
  const [totalMilliseconds, setTotalMiliseconds] = useState(totalSeconds * 1000); // 1 hour = 3600 seconds = 3600000 milliseconds
  const circumference = size * Math.PI * 2;
  const [countdown, setCountdown] = useState(totalMilliseconds);
  const [cd, setCd] = useState({
    hours: Math.floor(countdown / 1000 / 60 / 60),
    minutes: Math.floor(countdown / 1000 / 60),
    seconds: Math.floor((countdown / 1000) % 60)
  })
  const [isRunning, setIsRunning] = useState(false);
  const [active, setActive] = useState(false);
  let basicOffset = (countdown / totalMilliseconds) * circumference;
  const [strokeDashoffset, setStrokeDashoffset] = useState(basicOffset);
  let arrowSize = 23;
  const [habitId, setHabitId] = useState(undefined);
  const [error, setError] = useState('');


  const getTimer = async() => {
  // Get the timer from the database
  let user_id = '123e4567-e89b-12d3-a456-426614174000'
  let url = `http://localhost:8000/tracker/countdown/user/${user_id}`
  const response = await apiGetSingleItem(url);
  if (response) {
      //@ts-ignore
      setHabitId(response.id)
      // Convert the datetime strings to Date objects
      //@ts-ignore
      let endDatetime = new Date(response.end_datetime);
      //@ts-ignore
      let currentDatetime = new Date(response.current_datetime);

      // Calculate the total seconds
      let activeTimerSeconds = endDatetime.getTime() - currentDatetime.getTime();
      let activeTimerTotalSeconds = Math.floor(activeTimerSeconds / 1000);
      let activeTimerHours = Math.floor(activeTimerTotalSeconds / 60 / 60);
      let activeTimerMinutes = Math.floor(activeTimerTotalSeconds / 60);
      let activeTimerMiliseconds = activeTimerTotalSeconds * 1000;

      // Update the state and start the timer
      setTotalMiliseconds(activeTimerMiliseconds);
      // setCountdown(activeTimerMiliseconds); - errr
      setTotalSeconds(activeTimerTotalSeconds);
      setStrokeDashoffset((activeTimerMiliseconds / totalMilliseconds) * circumference);

      startTimer()
    }
  }

  // Online timer + CRUD operations + Notification + Tracker connection + Music randomizzer

  const pauseBeTimer = async() => {
    let id = habitId
    let url = `http://localhost:8000/tracker/countdown/${id}`
    let body = {
      "time": "2022-01-01T00:30:00",
    }
    await apiRequest('PUT',url, body)
  }

  const deactivateBeTimer = async() => {
    // Set the timer state to 'completed'
    let id = habitId
    let url = `http://localhost:8000/tracker/countdown/${id}/finish`
    let body = {
      "status": "completed",
    }
    try {
      apiRequest('PUT',url, body)
    } catch (error) {
      setError('Update failed')
    }
  }

  const startTimer = () => {
    setIsRunning(true);
    setActive(true);
    setCountdown(totalMilliseconds);
  }

  const resumeTimer = () => {
    setIsRunning(true);
    setCountdown(countdown)
  }

  const stopTimer = () => {
    setIsRunning(false);
    if (habitId){
      pauseBeTimer()
    } 
  }

  const resetTimer = async() => {
    setIsRunning(false);
    setActive(false);
    setCountdown(120*1000);
    setCd({ hours: Math.floor(120 / 60 / 60), minutes: Math.floor(120  / 60), seconds: Math.floor((120 ) % 60) })
    // Po resetu disablovat BE countdown
  }

  useEffect(() => {
    getTimer()
  }, [])

  useEffect(() => {
    if (isRunning && countdown > 0) {
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
                <div className='text-xs absolute right-1'>s</div>
             </div>
          </div>
          }
        </div>
      </div>
      {error && <div className='typo-long text-red-500'>{error}</div>}
      {!active && <>      
      <div className='typo-long'>Set your time goal</div>
      <div className='flex flex-row gap-5 py-5'>
      <div className='flex bg-gray-950 p-2 rounded-xl border border-gray-400/30 gap-4'>
        <button onClick={() => incrementHours({hrs: cd.hours, setHrs: setCd({hours: cd.hours + 1, minutes: cd.minutes, seconds: cd.seconds})})}>
          <ArrowUp size={arrowSize}/>
        </button>
        h
        <button onClick={() => decrementHours({hrs: cd.hours, setHrs: setCd({hours: cd.hours - 1, minutes: cd.minutes, seconds: cd.seconds})})}>
          <ArrowDown size={arrowSize}/>
        </button>
        </div>
        <div>
        <div className='flex bg-gray-950 p-2 rounded-xl border border-gray-400/30 gap-4'>
          <button onClick={() => incrementMinutes({mins: cd.minutes, setMins: setCd({hours: cd.hours, minutes: cd.minutes + 1, seconds: cd.seconds})})}>
            <ArrowUp size={arrowSize}/>
          </button>
          min
          <button onClick={() => decrementMinutes({mins: cd.minutes, setMins: setCd({hours: cd.hours, minutes: cd.minutes - 1, seconds: cd.seconds})})}>
            <ArrowDown size={arrowSize}/>
          </button>
        </div>
        </div>
      </div>
      </>}
      <div className='flex flex-row gap-5'>
        <div>
          {!active && <button onClick={startTimer}><PlayCircleIcon strokeWidth={1} size={30} color={'#86efac'}/></button> }
          {!isRunning && active && <button onClick={resumeTimer}><PlayCircleIcon strokeWidth={1} size={30} color={'#86efac'}/></button>}
          {isRunning &&
            <button
              className='animate-fadeIn transition-all duration-500 ease-in-out'
              onClick={stopTimer}><PauseCircleIcon strokeWidth={1} size={30} color={'#fde047'} /></button>}
        </div>
        {!isRunning && <div><button onClick={resetTimer}><Trash2Icon strokeWidth={1} size={30} color={'#fb7185'} /></button></div>}
      </div>
      {active && <MusicStarter/>}
      {renderDialog()}
      {countdown === 0 && <div className='typo-long'>Save</div>}
    </Dialog>
  </div>
}

export default Countdown