
'use client';
import { useEffect, useState } from "react";
import { CheckCheckIcon, PlusCircleIcon, XCircleIcon } from "lucide-react";
import { categories } from "@/data/enums";
import { getCategoryColor } from "@/app/lib/colorGetter";
import { Dialog, DialogTrigger } from "../ui/dialog";
import Modal from "../Modal";
import GoalNew from "./GoalNew";
import { Powah } from "../icons/illustrations";

const trackerExamples = [
    {id:1, name: 'Wake up early', completed: [true, true, false, false, true], category: categories[0].id },
    {id:2, name: 'Cook healthy dinner', completed: [true, false, false, false, false], category: categories[1].id },
    {id:3, name: 'Call a friend', completed: [false, false, false, false, false], category: categories[2].id },
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


    useEffect(() => {
        const lastFiveDays = () => {
            const today = new Date();
            const lastFiveDays = [];
            for (let i = 0; i < 5; i++) {
                const day = new Date(today);
                day.setDate(today.getDate() - i);
                lastFiveDays.push(day);
            }
            return lastFiveDays;
        }
        const days = lastFiveDays();
        setDays(days.map((day, index) => ({id: index, name: day.toLocaleString('en-US', { weekday: 'short' }).toUpperCase(), date: day.getDate().toString()})))
    }, [])

    const handleCheck = (trackerId, dayIndex) => {
        setTrackers(trackers.map(tracker => 
            tracker.id === trackerId ? {...tracker, completed: tracker.completed.map((completed, index) => 
                index === dayIndex ? !completed : completed
            )} : tracker
        ));
    }

    const renderDialog = () => {
        return <Modal title={'Create new goal'} description={''} content={<GoalNew/>} />
    }


    return <>
        <div className="flex flex-col relative justify-between items-start w-full h-full bg-gray-950 py-1 rounded-2xl text-sm ">
            <Dialog>
                <div className=" text-white w-full text-[9px]">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-mono">Weekly</h1>
                        </div>
                        <div className="flex items-center justify-end mb-4 relative gap-5">
                            {days.map(day => (
                                <div key={day.id} className="flex flex-col justify-center w-[20px]">
                                    <div>{day.name}</div>
                                    <div className="ml-1">{day.date}</div>
                                </div>
                            ))}
                        </div>
                        {trackers.map(tracker => (
                            <div key={tracker.id} className="flex items-center justify-between py-2 relative border-b border-transmain">
                                <div className="flex text-[11px] min-w-[150px]" style={{ color: getCategoryColor(tracker.category) }}>{tracker.name}</div>
                                <div className="flex flex-row justify-end gap-4 w-full">
                                    {tracker.completed.map((completed, index) => (
                                        <button key={index} onClick={() => handleCheck(tracker.id, index)}
                                            className="bg-slate-900 p-1 rounded-xl"
                                        >
                                            {completed ? <CheckCheckIcon className="h-4 w-4" style={{ color: getCategoryColor(tracker.category) }} /> : <XCircleIcon className="h-4 w-4 text-gray-500" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <DialogTrigger asChild>
                        <div className="flex flex-row justify-center"><button><PlusCircleIcon color={'#EEFF87'}/></button></div>
                    </DialogTrigger>
                    {trackers.length < 5 && <div className="flex flex-row justify-center opacity-50 mt-[50%]">
                            <Powah/>
                        </div>}
                </div>
                {renderDialog()}
            </Dialog>
        </div>
    </>
}

export default GoalOverview;