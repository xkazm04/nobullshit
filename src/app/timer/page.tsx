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
  const totalSeconds = 120;
  const size= 80;
  const totalMilliseconds = totalSeconds * 1000;
  const circumference = size * Math.PI * 2;
  const [countdown, setCountdown] = useState(totalMilliseconds);


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

  return (
    <div className="flex flex-col items-center justify-between w-full h-full">
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
      <div className='z-10 w-full'><BottomNav /></div>
    </div>
  );
};

export default Page;