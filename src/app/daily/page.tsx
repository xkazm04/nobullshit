'use client';
import { useState, useEffect } from 'react'

import Today from '../components/Tracking/Today';
import BottomNav from '../components/BottomNav';
import HeaderComponent from '../components/ui/header';
import { apiGetAllRequest } from '../lib/callers';
import { HabitType } from '../types/TrackerTypes';

const Page = () => {
    const [habits, setHabits] = useState<HabitType[]>([]);
    const url = 'http://localhost:8000/tracker/habits/user/123e4567-e89b-12d3-a456-426614174000'

    // Loading animation here
    
    const getHabits = async () => {
        const response = await apiGetAllRequest(url);
        setHabits(response);
    }

    useEffect(() => {
        getHabits();
    }, []);


    // Optimalization for lesser resolutions

    return <div className='relative flex flex-col justify-between h-full'>
        <HeaderComponent page={'Daily'}/>
        <div className="flex flex-col gap-5 justify-start mt-20 max-h-[700px] overflox-y-hiddenw">
            <Today habits={habits} />
        </div>
        <div className='z-10 w-full'><BottomNav /></div>
    </div>
}

export default Page