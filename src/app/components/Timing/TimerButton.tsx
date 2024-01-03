'use client';
import { getCategoryColor } from '@/app/lib/colorGetter';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCheckIcon } from 'lucide-react';
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
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [completed, setCompleted] = useState(false)
    const [timer, setTimer] = useState(time);
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
        let id = setInterval(() => {
            setTimer(timer => timer - 1)
        }, 1000)
        setIntervalId(id);
        setTimeout(() => {
            setCompleted(true);
            stopTimer();
        }, time * 1000)
    }

    const stopTimer = () => {
        setActive(false)
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    }

    const save = () => {
        console.log('save')
    }
    return (
        <div>
            <AnimatePresence>
                {!active ?
                    <motion.button
                        className={`text-xs px-3 py-2 rounded-xl border w-[100px] h-[100px]
        animate-fadeIn transition-all duration-500 ease-in-out ${completed ? 'bg-green-500' : 'bg-gray-950'}`}
                        style={{ borderColor: borderColor }}
                        onClick={() => !completed ? startTimer() : save()}>
                        <div>
                            <div className='flex justify-center'>
                                <div className='text-lg'>
                                    {!completed ? <>{timer}</> : <CheckCheckIcon />}
                                </div>
                                <div>{!completed ? <>s</> : <>save</>}</div>
                            </div>
                            <div className='font-mono text-xs'>{task}</div>
                        </div>
                    </motion.button> :
                    <motion.button
                        className={`text-xs px-3 py-2 bg-green-500/10 rounded-xl border w-[140px] h-[140px]
            animate-fadeIn transition-all duration-500 ease-in-out`}
                        style={{ borderColor: borderColor, backgroundColor: backgroundColor }}
                        onClick={() => stopTimer()}>
                        <div>
                            <div className='flex justify-center'><div className='text-2xl'>{timer}</div><div>s</div></div>
                            <div className='font-mono text-xs'>{task}</div>
                        </div>
                    </motion.button>}
            </AnimatePresence>
        </div>
    )
}

export default TimerButton