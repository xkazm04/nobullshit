'use client';
import { useState } from "react"
import { categories } from "@/data/enums";
import FormName from "../../form/FormName";
import FormCategory from "../../form/FormCategory";
import FormDays from "../../form/FormDays";
import FormCondition from "../../form/FormCondition";
import { HabitType, RecurrenceObject } from "@/app/types/TrackerTypes";
import { useMutation } from "@tanstack/react-query";
import { createHabit } from "@/app/apiFns/habitApis";
import useGetUser from "@/app/lib/hooks/useGetUser";

const HabitNew = () => {

    const [habitName, setHabitName] = useState('') 
    const [enableAi, setEnableAi] = useState(false)
    const [dayType, setDayType] = useState([false, false, false, false])
    const [activeCategory, setActiveCategory] = useState(categories[0])
    const [recurrence, setRecurrence] = useState<RecurrenceObject>();
    const [error, setError] = useState(false)
    const [specificDays, setSpecificDays] = useState([false, false, false, false, false, false, false])
    const [success, setSuccess] = useState(false)

    const user = useGetUser()


    const handleSubmit = () => {
        const newHabit: HabitType = { 
            userId: user,
            name: habitName,
            category: activeCategory.id,
            dayType: dayType,
            dateFrom: recurrence?.dateFrom.toISOString(),
            isRecurring: true,
            recurrenceType: 'weekly',
            recurrenceInterval: 1,
            specificDays: specificDays,
            active: true,
            ai: enableAi,
        }
        console.log(newHabit)
        // mutation.mutate(newHabit)
    }

    // Day type 4x boolean rewrite
    const mutation = useMutation({
        mutationFn: (habit: HabitType) => createHabit(habit),
        onSuccess: () => {
            setSuccess(true)
        },
        onError: () => {
            setError(true)
        }
        
    })

    return (
        <div className="page">
      
            {!success ?       
                <div className="w-full p-5 font-['Inter'] tracking-wide text-sm">
                        <FormCategory activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                        <div className="divider" />
                        <FormName setName={setHabitName} />
                        <div className="divider" />
                        <FormDays habitDays={specificDays} setHabitDays={setSpecificDays} label={'Repeat on'} />
                        <div className="divider" />
                        <FormCondition setChecked={setEnableAi} checked={enableAi} text={'Enable AI tasks recommendation'} />
                        {error && <>Error. You can finish the process</>}
                        <div className="full-w flex flex-row justify-center my-10">
                         {habitName !== '' &&  <button className="btn-action" onClick={handleSubmit}>Create goal</button>}
                        </div>
                    </div>  : <div className="typo-long">Success. Continue</div>}
                    {mutation.isError && <div className="alert-error">Error API</div>}
        </div>
    )
}

export default HabitNew