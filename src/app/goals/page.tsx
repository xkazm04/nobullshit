'use client';
import { useEffect } from "react";
import BottomNav from "../components/BottomNav";
import Header from "../components/Header";
import { goalExamples } from "@/data/examples";
import { GoalType } from "../types/TrackerTypes";
import GoalOverview from "../components/Tracking/GoalOverview";

const Page = () => {
    let user = 1;
    const getGoals = (user) => {
        console.log('getGoals');
    }
    useEffect(() => {
        getGoals(user);
    }, []);

    return <div className="flex flex-col justify-between items-center w-full h-full">
    <div className='absolute z-10 w-full'><Header /></div>   
    <div className="flex flex-col justify-center h-full w-full gap-5 mt-[20%] overflox-y-hidden">
        {goalExamples.map((goal: GoalType) => (
            <GoalOverview goal={goal}/>    
        ))}
    </div>
    <div className='z-10 w-full'><BottomNav /></div>
    </div>
}

export default Page;