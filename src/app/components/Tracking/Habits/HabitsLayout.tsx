'use client';
import { useState, useRef } from "react";
import HabitsDaily from "./HabitsDaily";
import {Dialog} from "../../ui/dialog";
import Modal from "../../Modal";
import CalendarPicker from "../../form/CalendarPicker";
import DatePicker from "../../form/DatePicker";


const Today = () => {
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const today = new Date().getDate();
    const [selectedDay, setSelectedDay] = useState(today);
    const [fullDate, setFullDate] = useState(new Date().toLocaleDateString());
    // Tbd after mock 
    // const filteredHabits = habits.filter((h:any) => h.date === fullDate);
    // Filter habits by date


    const scrollContainerRef = useRef(null);

    const clickDay = (day: any) => {
        setSelectedDay(day);
        setFullDate(new Date(new Date().getFullYear(), new Date().getMonth(), day).toLocaleDateString());
    }

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
       return <Modal title={'Pick a day from the calendar'} 
        description={''} 
        h={'min-h-[500px]'} 
        content={<CalendarPicker setDay={setFullDate} setSelectedDay={setSelectedDay}/>} />
    }


    return (
        <div className="flex flex-col  overflow-x-scroll hide-scrollbar relative">
            <Dialog>
            <DatePicker nextDay={nextDay} prevDay={prevDay} fullDate={fullDate} />
            <div className="flex flex-row justify-between relative">
                <div className="w-full flex-nowrap">
                    <ul className="flex gap-1 items-center justify-center md:justify-start animate-infinite-scroll" ref={scrollContainerRef}>
                        {days.map(day => (
                            <div
                                key={day}
                                onClick={() => clickDay(day)}
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
            <HabitsDaily day={fullDate} />
            {renderDialog()}
            </Dialog>
        </div>
    );
}

export default Today;
