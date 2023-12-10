'use client';
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react"

const TimeSetting = (time, setTime) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const totalMinutes = hours * 60 + minutes;

    const incrementHours = () => {
        if (hours < 24) {
            setHours(hours + 1);
            setTime(totalMinutes);
        }
    };

    const decrementHours = () => {
        if (hours > 0) {
            setHours(hours - 1);
            setTime(totalMinutes);
        }
    };

    const incrementMinutes = () => {
        if (minutes < 60) {
            setMinutes(minutes + 10);
            setTime(totalMinutes);
        }
    };

    const decrementMinutes = () => {
        if (minutes > 0) {
            setMinutes(minutes - 10);
            setTime(totalMinutes);
        }
    };

    return (
        <div className="flex justify-center space-x-4">
            <div className="flex flex-col items-center">
                <button onClick={incrementHours} className="text-gray-500"><ArrowUp /></button>
                <div className='flex flex-row justify-center items-center'>
                    <div className="w-10 text-center py-2 px-3 border bg-gray-900 rounded-2xl  focus:outline-none  appearance-none">
                        {hours}
                    </div>
                    <div className="text-gray-500">
                        H
                    </div>
                </div>
                <button onClick={decrementHours} className="text-gray-500"><ArrowDown /></button>
            </div>
            <div className="flex flex-col items-center">
                <button onClick={incrementMinutes} className="text-gray-500"><ArrowUp /></button>
                <div className='flex flex-row'>
                    <div className="w-10 text-center py-2 px-3 border bg-gray-900 rounded-2xl  focus:outline-none  appearance-none">
                        {minutes}
                    </div>
                    <div className="text-gray-500">
                        min
                    </div>
                </div>
                <button onClick={decrementMinutes} className="text-gray-500"><ArrowDown /></button>
            </div>
        </div>
    );
}

export default TimeSetting