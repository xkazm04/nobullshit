'use client';
import { useState } from 'react'

import Today from '../components/Tracking/Today';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const Page = () => {
    const [goals, setGoals] = useState([
        { name: 'Goal 1', category: 'Category 1', completed: true },
        { name: 'Goal 2', category: 'Category 2', completed: false },
    ]);

    // Optimalization for lesser resolutions

    return <div className='relative flex flex-col justify-between h-full'>
        <div className='absolute z-10 w-full'><Header /></div>
        <div className="flex flex-col gap-5 justify-start mt-20 max-h-[700px] overflox-y-hiddenw">
            <Today />
        </div>
        <div className='z-10 w-full'><BottomNav /></div>
    </div>
}

export default Page