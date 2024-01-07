'use client';
import { useState, useRef } from "react";
import HabitsDaily from "./HabitsDaily";
import {Dialog} from "../../ui/dialog";
import Modal from "../../Modal";
import CalendarPicker from "../../form/CalendarPicker";
import DatePicker from "../../form/DatePicker";
import Divider from "../../animations/Divider";

const HabitsLayout = () => {
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const today = new Date().getDate();
    const [selectedDay, setSelectedDay] = useState(today);
    const [fullDate, setFullDate] = useState(new Date().toLocaleDateString());
    const [appDate, setAppDate] = useState(new Date().toISOString().slice(0, 10));
    const scrollContainerRef = useRef(null);

    const clickDay = (day: any) => {
        setSelectedDay(day);
        setFullDate(new Date(new Date().getFullYear(), new Date().getMonth(), day).toLocaleDateString());
        setAppDate(new Date(new Date().getFullYear(), new Date().getMonth(), day).toISOString().slice(0, 10));
    }

    const nextDay = () => {
        if (selectedDay === daysInMonth) {
            setSelectedDay(1);
            setFullDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString());
            setAppDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString().slice(0, 10));
        } else {
            setSelectedDay(selectedDay + 1);
            setFullDate(new Date(new Date().getFullYear(), new Date().getMonth(), selectedDay + 1).toLocaleDateString());
            setAppDate(new Date(new Date().getFullYear(), new Date().getMonth(), selectedDay + 1).toISOString().slice(0, 10));
        }
    }

    const prevDay = () => {
        if (selectedDay === 1) {
            setSelectedDay(daysInMonth);
            setFullDate(new Date(new Date().getFullYear(), new Date().getMonth(), daysInMonth).toLocaleDateString());
            setAppDate(new Date(new Date().getFullYear(), new Date().getMonth(), daysInMonth).toISOString().slice(0, 10));
        } else {
            setSelectedDay(selectedDay - 1);
            setFullDate(new Date(new Date().getFullYear(), new Date().getMonth(), selectedDay - 1).toLocaleDateString());
            setAppDate(new Date(new Date().getFullYear(), new Date().getMonth(), selectedDay - 1).toISOString().slice(0, 10));
        }
    }

    const renderDialog = () => {
       return <Modal title={'Pick a day from the calendar'} 
        description={''} 
        h={'min-h-[500px]'} 
        content={<CalendarPicker setDay={setFullDate} setSelectedDay={setSelectedDay}/>} />
    }


    return (
        <div className="flex flex-col  overflow-x-scroll hide-scrollbar relative max-w-[370px]">
            <Dialog>
                <DatePicker nextDay={nextDay} prevDay={prevDay} fullDate={fullDate} />
                <div className="flex flex-row justify-between relative">
                    <div className="w-full flex-nowrap">
                        <ul className="flex gap-1 items-center justify-center md:justify-start animate-infinite-scroll" ref={scrollContainerRef}>
                            {days.map(day => (
                                <div
                                    key={day}
                                    onClick={() => clickDay(day)}
                                    className={`flex-none p-2 border-2 border-transmain rounded-2xl text-center 
                                    lg:cursor-pointer lg:hover:bg-transmain 
                                    ${day === today ? 'bg-transmain' : day === selectedDay ? 'bg-gray-950 text-main font-bold' : ''}`}
                                >
                                    {day}
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
                <Divider/>
                <HabitsDaily day={appDate} />
                {renderDialog()}
            </Dialog>
        </div>
    );
}

export default HabitsLayout;
