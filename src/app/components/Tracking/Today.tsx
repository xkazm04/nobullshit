import { useEffect, useState, useRef } from "react";
import HabitsDaily from "./Habits/HabitsDaily";
import {Dialog,DialogTrigger} from "../ui/dialog";
import Modal from "../Modal";
import CalendarPicker from "../form/CalendarPicker";


const Today = ({habits}:any) => {
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const today = new Date().getDate();
    const [selectedDay, setSelectedDay] = useState(today);
    const [fullDate, setFullDate] = useState(new Date().toLocaleDateString());

    const scrollContainerRef = useRef(null);

    useEffect(() => {
        console.log(selectedDay);
    }, [selectedDay]);

    const nextDay = () => {
        if (selectedDay === daysInMonth) {
            setSelectedDay(1);
            setFullDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString());

        } else {
            setSelectedDay(selectedDay + 1);
            setFullDate(new Date(new Date().getFullYear(), new Date().getMonth(), selectedDay + 1).toLocaleDateString());
        }
    }

    const prevDay = () => {
        if (selectedDay === 1) {
            setSelectedDay(daysInMonth);
            setFullDate(new Date(new Date().getFullYear(), new Date().getMonth(), daysInMonth).toLocaleDateString());
        } else {
            setSelectedDay(selectedDay - 1);
            setFullDate(new Date(new Date().getFullYear(), new Date().getMonth(), selectedDay - 1).toLocaleDateString());
        }
    }

    const renderDialog = () => {
       return <Modal title={'Pick a day from the calendar'} description={''} content={<CalendarPicker setDay={setFullDate}/>} />
    }


    return (
        <div className="flex flex-col  overflow-x-scroll hide-scrollbar relative">
            <Dialog>
                <div className="flex flex-row justify-center font-bold mb-5" >
                    <div className="">
                        <button className="text-main lg:hover:cursor-pointer px-2 py-1" onClick={() => { prevDay() }}>{"<"}</button>
                    </div>
                    <div>
                        <DialogTrigger asChild>
                            <button className="btn-mini mx-8 bg-transmain w-[150px]">
                                {fullDate}
                            </button>
                        </DialogTrigger>
                    </div>
                    <div className="">
                        <button className="text-main lg:hover:cursor-pointer px-2 py-1" onClick={() => { nextDay() }}>{">"}</button>
                    </div>
                </div>
            <div className="flex flex-row justify-between relative">
                <div className="w-full flex-nowrap">
                    <ul className="flex gap-1 items-center justify-center md:justify-start animate-infinite-scroll" ref={scrollContainerRef}>
                        {days.map(day => (
                            <div
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`flex-none p-3 border-2 border-transmain rounded-2xl text-center 
                                lg:cursor-pointer lg:hover:bg-transmain 
                                ${day === today ? 'bg-transmain' : day === selectedDay ? 'bg-gray-950 text-main font-bold' : ''}`}
                            >
                                {day}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
            <HabitsDaily selected={selectedDay.toString()} type={'Goals'} habits={habits} />
            {renderDialog()}
            </Dialog>
        </div>
    );
}

export default Today;
