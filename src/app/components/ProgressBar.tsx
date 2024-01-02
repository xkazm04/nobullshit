// ProgressBar.tsx
import React from 'react';

type ProgressBarProps = {
    percentage: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    return (
        <div className="w-full h-1 bg-gray-950/40 rounded-xl ease-in">
            <div style={{ width: `${percentage}%` }} className="h-full bg-green-600/70 rounded-xl transition-all duration-500 delay-200"></div>
        </div>
    );
};

export default ProgressBar;