'use client';
import { useState } from 'react'

import Today from '../components/Tracking/Today';
import BottomNav from '../components/BottomNav';
import HeaderComponent from '../components/ui/header';

const Page = () => {
    const [goals, setGoals] = useState([
        { name: 'Goal 1', category: 'Category 1', completed: true },
        { name: 'Goal 2', category: 'Category 2', completed: false },
    ]);

    // Optimalization for lesser resolutions

    return <div className='relative flex flex-col justify-between h-full'>
        <HeaderComponent page={'Daily'}/>
        <div className="flex flex-col gap-5 justify-start mt-20 max-h-[700px] overflox-y-hiddenw">
            <Today goals={goals} />
        </div>
        <div className='z-10 w-full'><BottomNav /></div>
    </div>
}

export default Page