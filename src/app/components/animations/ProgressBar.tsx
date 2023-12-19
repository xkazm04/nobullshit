'use client'
import { useEffect, useState } from 'react';

const ProgressBar = ({ duration }: any) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(oldProgress + 1, 100);
      });
    }, duration / 100);
    return () => {
      clearInterval(interval);
    };
  }, [duration]);

  return (
    <div className="w-full h-1 bg-gray-200 rounded-full">
      <div style={{ width: `${progress}%` }} className="h-full text-xs text-center text-white bg-main rounded-full"></div>
    </div>
  );
};

export default ProgressBar;