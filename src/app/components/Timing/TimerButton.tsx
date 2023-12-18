'use client';
import { getCategoryColor } from '@/app/lib/colorGetter';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';


type TimerButtonProps = {
    category: number,
    time: number,
    habitId: string,
    task: string,
}

// Function to convert hex color to RGB
function hexToRgb(hex: string): { r: number, g: number, b: number } | "null" {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    //@ts-ignore
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const TimerButton: React.FC<TimerButtonProps> = ({ category, time, habitId, task }) => {
    const hexColor = getCategoryColor(category);
    const rgbColor = hexToRgb(hexColor);
    const borderColor = hexColor;
    let backgroundColor = 'rgba(0, 0, 0, 0.1)';
    if (rgbColor !== null) {
        //@ts-ignore
        backgroundColor = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.1)`;
    }
    const [active, setActive] = useState(false);
    const startTimer = () => {
        setActive(true)
    }

    const stopTimer = () => {
        setActive(false)
    }
    return (
        <div>
            <AnimatePresence>
                {!active ?
                    <motion.button
                        className={`text-xs px-3 py-2 bg-gray-950 rounded-xl border w-[100px] h-[100px]
                animate-fadeIn transition-all duration-500 ease-in-out`}
                        style={{ borderColor: borderColor }}
                        onClick={() => startTimer()}>
                        <div>
                            <div className='flex justify-center'><div className='text-lg'>{time}</div><div>s</div></div>
                            <div className='font-mono text-xs'>{task}</div>
                        </div>
                    </motion.button> :
                    <motion.button
                        className={`text-xs px-3 py-2 bg-green-500/20 rounded-xl border w-[130px] h-[130px]
            animate-fadeIn transition-all duration-500 ease-in-out`}
                        style={{ borderColor: borderColor, backgroundColor: backgroundColor }}
                        onClick={() => stopTimer()}>
                        <div>
                            <div className='flex justify-center'><div className='text-2xl'>{time}</div><div>s</div></div>
                            <div className='font-mono text-xs'>{task}</div>
                        </div>
                    </motion.button>}
            </AnimatePresence>
        </div>
    )
}

export default TimerButton