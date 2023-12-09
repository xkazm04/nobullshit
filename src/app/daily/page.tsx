'use client';
import {useState} from 'react'

import Today from '../components/Tracking/Today';

const Page = () => {
    const [goals, setGoals] = useState([
        { name: 'Goal 1', category: 'Category 1', completed: true },
        { name: 'Goal 2', category: 'Category 2', completed: false },
      ]);
    
    return (
        <div className="flex flex-col gap-5 justify-start mt-20">
            <Today/>
        </div>
    )
}

export default Page