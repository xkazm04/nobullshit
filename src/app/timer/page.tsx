'use client';
import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const YtOptions = {
  height: '200',
  width: '320',
  playerVars: {
    autoplay: 1,
    controls: 0,
    disablekb: 0
  },
};


const Page = () => {
  const timerLength = 60 * 60;
  const [timeLeft, setTimeLeft] = useState(timerLength);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft(timeLeft => timeLeft - 1000);
    }, 1000);
  };

  const pauseTimer = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
  };

  const stopTimer = () => {
    setIsActive(false);
    setTimeLeft(timerLength);
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(timerLength);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      stopTimer();
    }
  }, [timeLeft]);


  const minutes = Math.floor(timeLeft / 60000);
  const seconds = ((timeLeft % 60000) / 1000).toFixed(0);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className='absolute z-10 w-full'><Header /></div>
      <div className="relative w-64 h-64">
        <svg className="absolute top-0 left-0 w-full h-full">
          <circle cx="50%" cy="50%" r="30%" stroke="gray" strokeWidth="2%" fill="transparent" />
          <circle
            cx="50%"
            cy="50%"
            r="30%"
            stroke="yellow"
            strokeWidth="1%"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 30}`}
            strokeDashoffset={`${(2 * Math.PI * 30 * (timerLength - timeLeft)) / timerLength}`}
          />
        </svg>
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-2xl">
          {timeLeft <= 0 ? <div>You did it!</div> : <>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</>}
        </div>
      </div>
      <div className="flex space-x-4">
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className='z-10 w-full'><BottomNav /></div>
    </div>
  );
};

export default Page;