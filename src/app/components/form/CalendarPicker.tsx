'use client';
import { useState } from 'react';
import { DialogClose } from '../ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';

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


const CalendarPicker = ({ setDay, setSelectedDay }: any) => {
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

  const isFuture = (date: any) => {
    const dateToCheck = new Date(currentYear, currentMonth, date);
    return dateToCheck > today;
  };
  const today = new Date();
  const isToday = (date: any) => today.getDate() === date && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
  return <>
    <div className='flex flex-col items-center justify-center gap-10 my-2 z-10 bg-gray-700/20 text-white p-4 rounded-lg relative w-full'>
      <AnimatePresence>
        <div className="flex justify-between w-full overflow-hidden">
          <button className="text-red-600" onClick={handlePrevMonth}>{"<"}</button>
          <motion.span
            key={months[currentMonth]}
            variants={slideVariants}
            initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit="exit" className=" flex flex-col">
              <div className='text-xl font-bold'>{months[currentMonth]} {currentYear}</div>
              <div className='text-xs font-sans'>Daily habits</div>
            </motion.span>
          <button className="text-red-600" onClick={handleNextMonth}>{">"}</button>
        </div>
      </AnimatePresence>
      <div className="grid grid-cols-7 gap-1 mt-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-medium" >
            {day}
          </div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => (
          <DialogClose key={i}>
            <div
              key={i + 1}
              className={`h-12 w-12 flex items-center justify-center rounded-2xl transition-all duration-200 font-sans
              ${isToday(i + 1) ? 'bg-orange-800' : 'bg-gray-950/30 border border-gray-800'}
              ${isFuture(i + 1) ? 'opacity-50 cursor-none' : 'md:hover:border-main  cursor-pointer md:hover:text-main'}`}
              onClick={() => handleDateClick(i + 1)}
            >
              {i + 1}
            </div>
          </DialogClose>
        ))}
      </div>
    </div>
  </>
}

export default CalendarPicker 