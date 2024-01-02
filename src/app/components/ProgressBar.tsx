// ProgressBar.tsx
import React from 'react';

type ProgressBarProps = {
    percentage: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    return (
        <div className="w-full h-2 bg-gray-950/40 rounded-xl">
            <div style={{ width: `${percentage}%` }} className="h-full bg-green-400/80 rounded-xl transition-all duration-500 delay-200"></div>
        </div>
    );
};

export default ProgressBar;