'use client';
import { useState } from "react"
import TimeSetting from "./TimeSetting";
const GoalNew = (goalId) => {
    const [habitDays, setHabitDays] = useState([false, false, false, false, false, false, false])
    const [targetName, setTargetName] = useState('') 
    const [time, setTime] = useState(0)
    const [enableTime, setEnableTime] = useState(false)

    const createGoal = () => {
        const goal = {
            id: goalId,
            name: targetName,
            days: habitDays,
            time: time
        }
        console.log(goal)
    }
   
    return (
        <div className="flex flex-col items-center justify-start w-full h-full py-10">
            <div className="w-full p-5">
                <div className="text-main font-semibold flex flex-row justify-center my-8">Target</div>
                <div className="divider" />
                <label htmlFor="habitName" className="sr-only">Target Name</label>
                <input
                    className="fullbox lg:hover:cursor-pointer "
                    type="text"
                    placeholder="Daily pushups"
                    onChange={e => setTargetName(e.target.value)}
                    autoComplete="off"
                />
                <div className="text-main font-semibold flex flex-row justify-center my-8">Days to follow</div>
                <div className="divider" />
                <div className="flex flex-row justify-center gap-5">
                    {habitDays.map((d, i) => <div className="flex flex-col items-center gap-2 lg:cursor-pointer">
                        <div className="text-gray-300">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</div>
                        <div className={`w-8 h-8 rounded-full flex flex-col justify-center items-center lg:hover:bg-transmain
                    ${d ? 'bg-main text-gray-900' : 'bg-gray-900 text-gray-300'}`}
                            onClick={() => setHabitDays(habitDays.map((d, j) => i === j ? !d : d))}
                        >
                            {i + 1}
                        </div>
                    </div>)}
                </div>
                {enableTime && <>
                    <div className="text-main font-semibold flex flex-row justify-center my-8">Session time</div>
                    <div className="divider" />
                    <TimeSetting time={time} setTime={setTime}/>
                    </>}
                   {targetName !== '' && <button className="btn-mini" onClick={createGoal}>Create goal</button>}
            </div>
        </div>
    )
}

export default GoalNew