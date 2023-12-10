'use client';
import YouTube from 'react-youtube';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import Timer from '../components/Timing/Timer';
import { useState } from 'react';

const YtOptions = {
  height: '200',
  width: '320',
  playerVars: {
    autoplay: 1,
    controls: 0,
    disablekb: 0
  },
};

const menuItems = [
  { name: 'Countdown', value: 'countdown' },
  { name: 'Timer', value: 'timer' }
];

const Page = () => {
  const [type, setType] = useState('' as string);

  const renderComponent = () => {
    switch (type) {
      case 'countdown':
        return <Timer />;
      case 'timer':
        return <Timer />;
      default:
        return <Timer />;
    }
  };


  return (
    <div className="flex flex-col items-center justify-between w-full h-full">
      <div className='absolute z-10 w-full'><Header /></div>      
        <div className='mt-[10%]'>
          {renderComponent()}
        </div>
        <div className='flex flex-row justify-center gap-10'>
          {menuItems.map((item) => (
            <div key={item.name}>
              <button className='btn-mini'>{item.name}</button>
            </div>
          ))}
        </div>   
      <div className='z-10 w-full'><BottomNav /></div>
    </div>
  );
};

export default Page;