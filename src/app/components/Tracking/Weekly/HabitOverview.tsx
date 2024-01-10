
'use client';
import { useEffect, useState } from "react";
import { FlagIcon, MoonIcon, PlusSquare, SunIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import Modal from "../../Modal";
import { Powah } from "../../icons/illustrations";
import HabitsWeekly from "./HabitsWeekly";
import SwitchIcon from "../../form/SwitchIcon";
import { getHabits } from "@/app/apiFns/habitApis";
import { useQuery } from "@tanstack/react-query";
import HabitSelection from "../Habits/HabitSelection";
import useGetUser from "@/app/lib/hooks/useGetUser";

const daysExamples = [
    {id:1, name: 'THU', date: '29'},
    {id:2, name: 'WED', date: '28'},
    {id:3, name: 'TUE', date: '27'},
    {id:4, name: 'MON', date: '26'},
    {id:5, name: 'SUN', date: '25'}
]
const HabitOverview = () => {
    const [days, setDays] = useState(daysExamples);
    const [activeFilter, setActiveFilter] = useState('all')
    const userId = useGetUser();
    // Use data after Postman tests
    const {data, error} = useQuery({
        queryKey: ['habits-all', userId],
        queryFn: () => getHabits(userId ? userId : ""),
        staleTime: Infinity
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



    const renderDialog = () => {
        return <Modal title={'Title'} description={'Description'} content={<HabitSelection/>} h={'min-h-[500px]'} />
    }


    return <>
        <div className={`flex flex-col relative justify-between items-start w-full h-full bg-gray-950 py-1 rounded-2xl text-sm md:p-5 border border-gray-800/50
            ${error && 'border-red-400'}
        `}>
            <Dialog>
                <div className="text-white w-full text-[10px] md:text-[14px]">
                    <div className="container mx-auto px-4 py-6 relative">
                        <div className="flex items-center justify-end mb-4 relative gap-5">
                            {days.map(day => (
                                <div key={day.id} className="flex flex-col justify-center w-[20px] md:w-[27px]">
                                    <div style={day.id === 0 ? { color: '#EEFF87' } : {}}>{day.name}</div>
                                    <div className="ml-1">{day.date}</div>
                                </div>
                            ))}
                        </div>
                        <div className="absolute top-[25px] flex flex-row gap-5">
                            <SwitchIcon active={activeFilter} myState='all' bgColor={'bg-purple-900'} setActive={setActiveFilter} icon={<FlagIcon/>}/>
                            <SwitchIcon active={activeFilter} myState='sun' bgColor={'bg-orange-950'} setActive={setActiveFilter} icon={<SunIcon/>}/>
                            <SwitchIcon active={activeFilter} myState='moon' bgColor={'bg-blue-900'} setActive={setActiveFilter}  icon={<MoonIcon/>}/>
                        </div>
                        <HabitsWeekly habits={data}/>
                    </div>
                    <DialogTrigger asChild>
                        <div className="flex flex-row justify-center">
                            <button className="md:hover:opacity-90 md:cursor-pointer">
                                <PlusSquare size={35} color={'#EEFF87'} strokeWidth={1}/>
                            </button>
                        </div>
                    </DialogTrigger>
                    {data && data.length < 5 && <div className="flex flex-row justify-center opacity-50 mt-[50%]">
                            <Powah/>
                        </div>}
                </div>
                {renderDialog()}
            </Dialog>
        </div>
    </>
}

export default HabitOverview;