'use client';
import { useState, useEffect } from 'react'

import Today from '../components/Tracking/HabitsDayPicker';
import BottomNav from '../components/BottomNav';
import HeaderComponent from '../components/ui/header';
import { apiGetAllRequest } from '../lib/callers';
import { HabitType } from '../types/TrackerTypes';
import LoadingAnim from '../components/LoadingAnim';

const Page = () => {
    const [habits, setHabits] = useState<HabitType[]>([]);
    const url = 'http://localhost:8000/tracker/habits/user/123e4567-e89b-12d3-a456-426614174000'
    const [loading,setLoading] = useState(true);

    // Loading animation here
    
    const getHabits = async () => {
        const response = await apiGetAllRequest(url);
        setHabits(response);
    }

    useEffect(() => {
        if (habits.length === 0){
            getHabits();
            setTimeout(() => {
                setLoading(false)
            }, 1500)
        } else {
            setLoading(false)
        }
    }, []);


    // Optimalization for lesser resolutions

    return <div className='relative flex flex-col justify-between h-full'>
        <HeaderComponent page={'Daily'}/>
        {loading ? <LoadingAnim/> : 
        <div className="flex flex-col gap-5 justify-start mt-20 max-h-[700px] overflox-y-hiddenw">
            <Today habits={habits} />
        </div>}
        <div className='z-10 w-full'><BottomNav /></div>
    </div>
}

export default Page