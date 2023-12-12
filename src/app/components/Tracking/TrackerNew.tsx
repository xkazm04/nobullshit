'use client';
import { categories, DailyTypes } from "@/data/enums"
import { useState } from "react"
import FormCategory from "../form/FormCategory";
import FormName from "../form/FormName";
import FormDays from "../form/FormDays";
import FormDayType from "../form/FormDayType";


const TrackerNew = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0])
    const [habitName, setHabitName] = useState('')
    const [habitDays, setHabitDays] = useState([false, false, false, false, false, false, false])
    const [dayType, setDayType] = useState(DailyTypes[0])
    // Daily types to checkboxes
    const createHabbit = () => {
        const habit = {
            name: habitName,
            days: habitDays,
            category: activeCategory
        }
        console.log(habit)
    }
    return (
        <div className="page">
            <div className="w-full p-5 font-['Inter'] capitalize tracking-wide text-sm">
                <FormName setName={setHabitName} />
                <div className="divider" />
                <FormCategory activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                <div className="divider" />
                <FormDays habitDays={habitDays} setHabitDays={setHabitDays} />
                <div className="divider" />
                <FormDayType setDayType={setDayType} />
            </div>
            {habitName !== '' && <button className="btn-mini" onClick={createHabbit}>Create</button>}
        </div>
    )
}

export default TrackerNew