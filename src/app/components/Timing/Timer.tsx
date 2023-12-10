'use client';
import { useState, useEffect } from 'react';

const Timer = ({time, type}) => {
    const totalSeconds = 120;
    const size= 80;
    const totalMilliseconds = totalSeconds * 1000;
    const circumference = size * Math.PI * 2;
    const [countdown, setCountdown] = useState(totalMilliseconds);
    // Add hours
  
    useEffect(() => {
      if (countdown > 0) {
        const interval = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 10);
        }, 10);
        return () => clearInterval(interval);
      }
    }, [countdown]);
  
    const minutes = Math.floor(countdown / 1000 / 60);
    const seconds = Math.floor((countdown / 1000) % 60);
    const strokeDashoffset = (countdown / totalMilliseconds) * circumference;
    return <>
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
          {countdown <= 0 ? <div>You did it!</div> : <>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</>}
        </div>
      </div>
      <div className="flex space-x-4">
        <button>Start</button>
      </div>
    </>
}

export default Timer