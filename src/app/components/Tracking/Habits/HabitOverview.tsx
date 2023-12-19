
'use client';
import { useEffect, useState } from "react";
import { FlagIcon, MoonIcon, PlusCircleIcon, SunIcon } from "lucide-react";
import { categories } from "@/data/enums";
import { getCategoryColor } from "@/app/lib/colorGetter";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import Modal from "../../Modal";
import HabitNew from "./HabitNew";
import { Powah } from "../../icons/illustrations";
import HabitsWeekly from "./HabitsWeekly";
import SwitchIcon from "../../form/SwitchIcon";
import { getHabits } from "@/app/apiFns/habitApis";
import { useQuery } from "@tanstack/react-query";

const trackerExamples = [
    {id:1, name: 'Wake up early', completed: [true, true, false, false, true], category: categories[0].id, dayType: 'morning' },
    {id:2, name: 'Cook healthy dinner', completed: [true, false, false, false, false], category: categories[1].id, dayType: 'noon' },
    {id:3, name: 'Call a friend', completed: [false, false, false, false, false], category: categories[2].id, dayType: 'night' },
]

const daysExamples = [
    {id:1, name: 'THU', date: '29'},
    {id:2, name: 'WED', date: '28'},
    {id:3, name: 'TUE', date: '27'},
    {id:4, name: 'MON', date: '26'},
    {id:5, name: 'SUN', date: '25'}
]
const HabitOverview = () => {
    const [days, setDays] = useState(daysExamples);
    const [showDetail, setShowDetail] = useState(false);
    const [trackers, setTrackers] = useState(trackerExamples);
    const [activeFilter, setActiveFilter] = useState('all')
    
    // Use data after Postman tests
    const {data, error} = useQuery({
        queryKey: ['habits'],
        queryFn: getHabits
    })

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

    const filter = (fil) => {
        if (fil === 'all') {
            setActiveFilter('all');
            return trackers;
        } else {
            setActiveFilter(fil);
            return trackers.filter(tracker => tracker.dayType === fil);
        }
    }

    const handleCheck = (trackerId, dayIndex) => {
        setTrackers(trackers.map(tracker => 
            tracker.id === trackerId ? {...tracker, completed: tracker.completed.map((completed, index) => 
                index === dayIndex ? !completed : completed
            )} : tracker
        ));
    }

    const renderDialog = () => {
        return <Modal title={'Create new habit'} description={''} content={<HabitNew/>} />
    }


    return <>
        <div className="flex flex-col relative justify-between items-start w-full h-full bg-gray-950 py-1 rounded-2xl text-sm ">
            <Dialog>
                <div className=" text-white w-full text-[9px]">
                    <div className="container mx-auto px-4 py-6 relative">
                        <div className="flex items-center justify-end mb-4 relative gap-5">
                            {days.map(day => (
                                <div key={day.id} className="flex flex-col justify-center w-[20px]">
                                    <div>{day.name}</div>
                                    <div className="ml-1">{day.date}</div>
                                </div>
                            ))}
                        </div>
                        <div className="absolute top-[25px] flex flex-row gap-5">
                            <SwitchIcon active={activeFilter} myState='all' bgColor={'bg-purple-900'} setActive={()=>{filter('all')}} icon={<FlagIcon/>}/>
                            <SwitchIcon active={activeFilter} myState='sun' bgColor={'bg-orange-950'} setActive={()=>{filter('sun')}} icon={<SunIcon/>}/>
                            <SwitchIcon active={activeFilter} myState='moon' bgColor={'bg-blue-900'} setActive={()=>{filter('moon')}} icon={<MoonIcon/>}/>
                        </div>
                        <HabitsWeekly trackers={trackers} handleCheck={handleCheck}/>
                    </div>
                    <DialogTrigger asChild>
                        <div className="flex flex-row justify-center"><button><PlusCircleIcon color={'#EEFF87'}/></button></div>
                    </DialogTrigger>
                    {trackers.length < 5 && <div className="flex flex-row justify-center opacity-50 mt-[50%]">
                            <Powah/>
                        </div>}
                    {error && <div className="alert-error">Error API</div>}
                </div>
                {renderDialog()}
            </Dialog>
        </div>
    </>
}

export default HabitOverview;