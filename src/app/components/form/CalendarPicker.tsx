'use client';
import { useState } from 'react';
import { DialogClose } from '../ui/dialog';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const CalendarPicker = ({setDay}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
      
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const handlePrevMonth = () => {
        setCurrentMonth(currentMonth - 1);
        if (currentMonth - 1 < 0) {
          setCurrentMonth(11);
          setCurrentYear(currentYear - 1);
        }
      }
    
      const handleNextMonth = () => {
        setCurrentMonth(currentMonth + 1);
        if (currentMonth + 1 > 11) {
          setCurrentMonth(0);
          setCurrentYear(currentYear + 1);
        }
      }
    
      const handleDateClick = (day) => {
        // Sett full date 
        setDay(new Date(currentYear, currentMonth, day).toLocaleDateString())
      }
    const today = new Date();
    const isToday = (date) => today.getDate() === date && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
    return <>
        <div>
      <div className='flex flex-row items-center justify-center gap-10 absolute z-10 '>
        <div className="bg-gray-950 text-white p-4 rounded-lg relative w-full">
          <div className="flex justify-between">
            <button className="text-red-600" onClick={handlePrevMonth}>{"<"}</button>
            <span className="text-xl font-bold">{months[currentMonth]} {currentYear}</span>
            <button className="text-red-600" onClick={handleNextMonth}>{">"}</button>
          </div>
          <div className="grid grid-cols-7 gap-1 mt-4">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-center font-medium">
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