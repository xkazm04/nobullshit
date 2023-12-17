'use client';
import { useState } from "react"
import TimeSetting from "../../form/TimeSetting";
import { categories } from "@/data/enums";
import FormName from "../../form/FormName";
import FormCategory from "../../form/FormCategory";
import FormDays from "../../form/FormDays";
import FormDayType from "../../form/FormDayType";
import FormCondition from "../../form/FormCondition";
import { apiRequest } from "@/app/lib/callers";
import { HabitType, RecurrenceObject } from "@/app/types/TrackerTypes";
import FormDateSetting from "../../form/FormDateSetting";
import { trackerExampleReq } from "@/data/examples";

type Props = {
    setFn: (condition?: boolean) => void
}

const HabitNew = ({setFn}: Props) => {

    const [targetName, setTargetName] = useState('') 
    const [time, setTime] = useState(0)
    const [enableTime, setEnableTime] = useState(false)
    const [habitDays, setHabitDays] = useState([false, false, false, false, false, false, false])
    const [dayType, setDayType] = useState([false, false, false, false])
    const [dateFrom, setDateFrom] = useState(new Date())
    const [dateTo, setDateTo] = useState()
    const [enabledDates, setEnabledDates] = useState(false)
    const [activeCategory, setActiveCategory] = useState(categories[0].id)
    const [recurrence, setRecurrence] = useState<RecurrenceObject>();
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // Day type 4x boolean rewrite


    const createGoal = async() => {
        const url = 'http://localhost:8000/tracker/habit';
        try {
            await apiRequest('POST', url, trackerExampleReq)
            setFn(true)
            setSuccess(true)
        } catch (err) { 
            setError(true)
            setFn(true)
        }
    }
   
    return (
        <div className="page">

            {!success ?       
                <div className="w-full p-5 font-['Inter'] capitalize tracking-wide text-sm">
                        <FormCategory activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                        <div className="divider" />
                        <FormName setName={setTargetName} />
                        <div className="divider" />
                        <FormDays habitDays={habitDays} setHabitDays={setHabitDays} label={'Days to complete'} />
                        <div className="divider" />
                        <FormDayType setDayType={setDayType} />
                        <div className="divider" />
                        <div className='flex flex-row justify-between py-1'>
                        <FormCondition setChecked={setEnableTime} checked={enableTime} text={'time enabler'} />
                        {enableTime && <>
                            <TimeSetting time={time} setTime={setTime}/>
                            </>}
                        </div>
                        <div className='flex flex-row justify-between py-1'>
                            <FormCondition setChecked={setEnabledDates} checked={enabledDates} text={'More date options'} />
                            {enabledDates && <>
                                <FormDateSetting setRecurrence={setRecurrence}/>
                            </>}
                        </div>
                        {recurrence && <>

                        </>}
                        {error && <>Error. You can finish the process</>}
                    
                        <div className="full-w flex flex-row justify-center my-10">
                            <button className="btn-action" onClick={createGoal}>Create goal</button>
                        </div>
                    </div>  : <div className="typo-long">Great. Continue</div>}
        </div>
    )
}

export default HabitNew