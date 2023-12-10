'use client';
import { useState } from "react"
import TimeSetting from "./TimeSetting";
import DaySetting from "./DaySetting";
const GoalNew = (goalId) => {

    const [targetName, setTargetName] = useState('') 
    const [time, setTime] = useState(0)
    const [enableTime, setEnableTime] = useState(false)
    const [habitDays, setHabitDays] = useState([false, false, false, false, false, false, false])

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
                    {habitDays.map((d, i) => 
                        <DaySetting habitDays={habitDays} setHabitDays={setHabitDays} d={d} i={i} />
                    )}
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