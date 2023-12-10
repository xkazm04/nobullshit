
'use client';
import { GoalType } from "@/app/types/TrackerTypes"
import DaySetting from "./DaySetting";
import { useState } from "react";
import GoalDetail from "./GoalDetail";
const GoalOverview = ({ goal }: GoalType) => {
    const [days, setDays] = useState(goal.appliedInDays);
    const [showDetail, setShowDetail] = useState(false);
    return <>
        {!showDetail ?  <div key={goal.id} className="flex flex-col relative justify-between items-start w-full h-full bg-cc px-5 py-1 rounded-2xl text-sm ">
                <div>
                    <div className="text-md font-bold font-['Inter'] capitalize tracking-wider text-center">{goal.title}</div>
                </div>
                <div>
                    Day row
                    {/* {goal.appliedInDays.map((day) => (
                        <DaySetting habitDays={days} setHabitDays={setDays} d={day} i={goal.appliedInDays.indexOf(day)}/>
                    ))} */}
                </div>
                <div className="flex flex-row justify-between w-full">
                    <div className="text-xs font-thin font-['Inter'] capitalize tracking-wide text-center flex flex-row justify-start">
                        <div>Weekly: 0%</div>  <div>Monthly: 0%</div> <div>Total: 0%</div>
                    </div>
                    <div className="flex flex-row gap-5">
                        <button>+</button>
                        <button onClick={()=>{setShowDetail(true)}}>d</button>
                    </div>
                </div> 
        </div>: 
        <div className="absolute full-h">
            <GoalDetail goal={goal}/>
        </div>}
    </>
}

export default GoalOverview;