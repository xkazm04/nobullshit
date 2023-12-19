'use client';
import { useState } from 'react';
import { DialogClose } from '../ui/dialog';
import {motion, AnimatePresence} from 'framer-motion';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const slideVariants = {
  hiddenRight: {
    x: "100%",
    opacity: 0,
  },
  hiddenLeft: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: "0",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.5,
    },
  },
};


const CalendarPicker = ({ setDay, setSelectedDay }:any) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [direction, setDirection] = useState('left');
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth - 1);
    setDirection('right')
    if (currentMonth - 1 < 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    }
  }

  const handleNextMonth = () => {
    setDirection('left')
    setCurrentMonth(currentMonth + 1);
    if (currentMonth + 1 > 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    }
  }

  const handleDateClick = (day: any) => {
    // Sett full date 
    setDay(new Date(currentYear, currentMonth, day).toLocaleDateString())
    setSelectedDay(day)
  }
  const today = new Date();
  const isToday = (date:any) => today.getDate() === date && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
  return <>
    <div className=''>
      <div className='flex flex-row items-center justify-center gap-10 absolute z-10 '>
        <div className="bg-gray-950 text-white p-4 rounded-lg relative w-full">
          <AnimatePresence>
          <div className="flex justify-between full-w overflow-hidden">
            <button  className="text-red-600" onClick={handlePrevMonth}>{"<"}</button>
            <motion.span
                        key={months[currentMonth]}
                        variants={slideVariants}
                        initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
                        animate="visible"
                        exit="exit" className="text-xl font-bold">{months[currentMonth]} {currentYear}</motion.span>
            <button className="text-red-600" onClick={handleNextMonth}>{">"}</button>
          </div>
          </AnimatePresence>
          <div className="grid grid-cols-7 gap-1 mt-4">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-center font-medium" >
                {day}
              </div>
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => (
              <DialogClose>
                <div
                  key={i}
                  className={`h-12 w-12 flex items-center justify-center rounded-2xl cursor-pointer hover:bg-green-900 hover:border-green-500 hover:opacity-20 transition-all 
                                ${isToday(i + 1) ? 'bg-orange-800' : 'bg-gray-950 border border-gray-800'}`}
                  onClick={() => handleDateClick(i + 1)}
                >
                  {i + 1}
                </div>
              </DialogClose>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
}

export default CalendarPicker 