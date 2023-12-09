'use client';
import { useEffect, useState } from 'react';
import { apiRequest } from '@/app/lib/callers';

// components/Calendar.js
const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

type DayType = {
  day_id: number;
  day_created: string;
  completed: boolean;
}

const Calendar = (tracker) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDates, setSelectedDates] = useState({});

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // You don't work with Ids 

  const fetchTrackerDays = async () => {
    const data = await apiRequest('GET', `tracker/${tracker.id}/days`);
    const days = {};
    data.forEach(day => {
      days[day.day] = day.completed;
    });
    console.log(days);
    setSelectedDates(days);
  }

  const createDay = async (tracker_id: number, day: string) => {
    const data = await apiRequest('POST', 'tracker/day', { tracker_id, day });
    setSelectedDates(data);
  };


  const updateDay = async (day_id) => {
    await apiRequest('PUT', `tracker/day/${day_id}`);
  };

  useEffect(() => {
    fetchTrackerDays();
  }, [])

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
    handleDateClickApi(day);
    handleDateClickColor(day);
  }

  const handleDateClickApi = async (date: string) => {
    const dateKey = `${currentYear}-${currentMonth + 1}-${date}`;
    console.log(dateKey);
    if (selectedDates[dateKey]) {
      await updateDay(selectedDates[dateKey].day_id);
    } else {
      await createDay(tracker.id, dateKey);
    }
  }

  const handleDateClickColor = (date: string) => {
    const dateKey = `${currentYear}-${currentMonth + 1}-${date}`;
    setSelectedDates(prev => ({
      ...prev,
      [dateKey]: {
        ...(prev[dateKey] || {}),
        completed: !prev[dateKey]?.completed
      }
    }));
  };


  const today = new Date();
  const isToday = (date) => today.getDate() === date && today.getMonth() === currentMonth && today.getFullYear() === currentYear;

  return (
    <div>
      <div className='flex flex-row items-center justify-center gap-10 absolute z-10 '>
        <div className="bg-gray-950 text-white p-4 rounded-lg relative w-full">
          <div className='text-xl'>{tracker.tracker_name}</div>
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
              <div
                key={i}
                className={`h-12 w-12 flex items-center justify-center rounded-2xl cursor-pointer hover:bg-green-900 hover:border-green-500 hover:opacity-20 transition-all 
                          ${selectedDates[`${currentYear}-${currentMonth + 1}-${i + 1}`] ? 'bg-green-900 border border-green-500' : isToday(i + 1) ? 'bg-orange-800' : 'bg-gray-950 border border-gray-800'}`}
                onClick={() => handleDateClick(i + 1)}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;