'use client'
import { useState } from "react"

const DaySetting = ({ habitDays, setHabitDays, d, i }) => {
    const [days, setDays] = useState([false, false, false, false, false, false, false])
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
      setHabitDays(days.map((d, j) => i === j ? !d : d))
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 1000); // Reset after 1s
    };
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="text-gray-300">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</div>
            <div className={`w-8 h-8 rounded-full flex flex-col justify-center items-center lg:hover:bg-transmain
                    ${isClicked ? 'animate-touch' : ''}
                    ${d ? 'bg-main text-gray-900' : 'bg-gray-900 text-gray-300'}`}
                onClick={() => handleClick()}
            >
                {i + 1}
            </div>
        </div>
    )
}

export default DaySetting
