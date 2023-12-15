'use client';
import { useEffect } from "react";
import BottomNav from "../components/BottomNav";
import HabitOverview from "../components/Tracking/Habits/HabitOverview";
import HeaderComponent from "../components/ui/header";


const Page = () => {
    let user = 1;
    const getAllGoals = (user) => {
        console.log('getGoals');
    }
    useEffect(() => {
        getAllGoals(user);
    }, []);

    return <div className="flex flex-col justify-between items-center w-full h-full relative">
        
            <div className='flex flex-row justify-between absolute z-10 w-full'>
                <HeaderComponent page={'Weekly trackers'}/>
            </div>
            <div className="flex flex-col justify-center h-full w-full gap-5 mt-[20%] overflox-y-hidden">
                <HabitOverview />
            </div>
            <div className='z-10 w-full'><BottomNav /></div>
    </div>
}

export default Page;