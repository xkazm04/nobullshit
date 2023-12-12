'use client';
import { useEffect } from "react";
import BottomNav from "../components/BottomNav";
import Header from "../components/Header";
import GoalOverview from "../components/Tracking/GoalOverview";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    let user = 1;
    const getGoals = (user) => {
        console.log('getGoals');
    }
    useEffect(() => {
        getGoals(user);
    }, []);

    const createGoal = () => {
        router.push('/create')
    }

    return <div className="flex flex-col justify-between items-center w-full h-full">
        <div className='flex flex-row justify-between absolute z-10 w-full'>
            <Header />
            <div className="p-6 lg:cursor-pointer lg:hover:bg-transmain" onClick={createGoal}><PlusIcon color={'#EEFF87'} /></div>
        </div>
        <div className="flex flex-col justify-center h-full w-full gap-5 mt-[20%] overflox-y-hidden">
            <GoalOverview />
        </div>
        <div className='z-10 w-full'><BottomNav /></div>
    </div>
}

export default Page;