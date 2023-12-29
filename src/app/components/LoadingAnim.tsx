import React from 'react';
import { NoBullshitLogo } from './icons/illustrations';
import ProgressBar from './animations/ProgressBar';

const LoadingAnim: React.FC = () => {

  return (
    <div className="page">
      <div className=''>Your Turn</div>
       <div className="animate-pulse bg-main rounded-full h-12 w-12"></div>
       <NoBullshitLogo color={'#e5e5e5'}/>
       <div className='flex flex-col gap-10 w-full justify-center items-center'>
        <ProgressBar duration={2000}/>
        </div>
    </div>
  );
};

export default LoadingAnim;