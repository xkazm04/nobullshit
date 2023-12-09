import React from 'react';

const LoadingAnim: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-pulse bg-main rounded-full h-12 w-12"></div>
    </div>
  );
};

export default LoadingAnim;