import { useEffect, useState, useRef } from "react";
import Calendar from "./Calendar";
import Goals from "./Goals";
import {Dialog,DialogTrigger} from "../ui/dialog";
import Modal from "../Modal";

const Today = () => {
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const today = new Date().getDate();
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDay, setSelectedDay] = useState(today);
    const [showGoals, setShowGoals] = useState(true);
    const [showHabbits, setShowHabbits] = useState(true);
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
       return <Modal title={'Pick a day from the calendar'} description={''} content={<Calendar/>} />
    }


    return (
        <div className="flex flex-col  overflow-x-scroll hide-scrollbar relative">
            <Dialog>
            <DialogTrigger asChild>
                <div className="flex flex-row justify-center font-bold mb-5" >
                    <div className="">
                        <button className="text-main lg:hover:cursor-pointer px-2 py-1" onClick={() => { prevDay() }}>{"<"}</button>
                    </div>
                    <div >
                        <button onClick={() => setShowCalendar(!showCalendar)} className="btn-mini mx-8 bg-transmain w-[150px]">
                            {fullDate}
                        </button>
                    </div>
                    <div className="">
                        <button className="text-main lg:hover:cursor-pointer px-2 py-1" onClick={() => { nextDay() }}>{">"}</button>
                    </div>
                </div>
            </DialogTrigger>
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
            {showGoals && <Goals selected={selectedDay.toString()} type={'Goals'} />}
            {showHabbits && <Goals selected={selectedDay.toString()} type={'Habbits'} />}
            {renderDialog()}
            </Dialog>
        </div>
    );
}

export default Today;
