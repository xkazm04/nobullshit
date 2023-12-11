
'use client';
import { GoalType } from "@/app/types/TrackerTypes"
import DaySetting from "./DaySetting";
import { useState } from "react";
import GoalDetail from "./GoalDetail";
import { CheckCheckIcon } from "lucide-react";
import { XCircleIcon } from "lucide-react";
const trackerExamples = [
    {id:1, name: 'Wake up early', completed: [true, true, false, false, true] },
    {id:2, name: 'Cook healthy dinner', completed: [true, false, false, false, false] },
    {id:3, name: 'Call a friend', completed: [false, false, false, false, false]},
]

const daysExamples = [
    {id:1, name: 'THU', date: '29'},
    {id:2, name: 'WED', date: '28'},
    {id:3, name: 'TUE', date: '27'},
    {id:4, name: 'MON', date: '26'},
    {id:5, name: 'SUN', date: '25'}
]
const GoalOverview = () => {
    const [days, setDays] = useState(daysExamples);
    const [showDetail, setShowDetail] = useState(false);
    const [trackers, setTrackers] = useState(trackerExamples);

    const handleCheck = (trackerId, dayIndex) => {
        setTrackers(trackers.map(tracker => 
            tracker.id === trackerId ? {...tracker, completed: tracker.completed.map((completed, index) => 
                index === dayIndex ? !completed : completed
            )} : tracker
        ));
    }
    return <>
        <div className="flex flex-col relative justify-between items-start w-full h-full bg-cc px-5 py-1 rounded-2xl text-sm ">
            <div className="bg-gray-800 text-white w-full text-[9px]">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-mono">Weekly</h1>
                    </div>
                    <div className="flex items-center justify-end mb-4 relative gap-3">
                        {days.map(day => (
                            <div key={day.id} className="flex flex-col justify-center">
                                <div>{day.name}</div>
                                <div className="ml-1">{day.date}</div>
                            </div>
                        ))}
                    </div>
                    {trackers.map(tracker => (
                        <div key={tracker.id} className="flex items-center justify-between mb-4 relative">
                            <div className="flex text-[11px] min-w-[150px] ">{tracker.name}</div>
                            <div className="flex flex-row justify-end gap-4 w-full">
                                {tracker.completed.map((completed, index) => (
                                    <button key={index} onClick={() => handleCheck(tracker.id, index)}
                                        className="bg-slate-900 p-1 rounded-xl"
                                    >
                                        {completed ? <CheckCheckIcon className="h-4 w-4 text-green-500" /> : <XCircleIcon className="h-4 w-4 text-gray-500" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
}

export default GoalOverview;