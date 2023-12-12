'use client';
import { useState } from "react"
import TimeSetting from "./TimeSetting";
import DaySetting from "./DaySetting";
import { DailyTypes, categories } from "@/data/enums";
import FormName from "../form/FormName";
import FormCategory from "../form/FormCategory";
import FormDays from "../form/FormDays";
import FormDayType from "../form/FormDayType";
const GoalNew = (goalId) => {

    const [targetName, setTargetName] = useState('') 
    const [time, setTime] = useState(0)
    const [enableTime, setEnableTime] = useState(false)
    const [habitDays, setHabitDays] = useState([false, false, false, false, false, false, false])
    const [dayType, setDayType] = useState(DailyTypes[0])
    const [activeCategory, setActiveCategory] = useState(categories[0])

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
        <div className="page">
            <div className="w-full p-5 font-['Inter'] capitalize tracking-wide text-sm">
                <FormName setName={setTargetName} />
                <div className="divider" />
                <FormCategory activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                <div className="divider" />
                <FormDays habitDays={habitDays} setHabitDays={setHabitDays} />
                <div className="divider" />
                <FormDayType setDayType={setDayType} />
            </div>
            <div className="w-full p-5">
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