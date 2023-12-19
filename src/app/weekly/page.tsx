import BottomNav from "../components/BottomNav";
import HabitOverview from "../components/Tracking/Habits/HabitOverview";
import HeaderComponent from "../components/ui/header";
import { getHabits } from '../apiFns/habitApis';
import {dehydrate,HydrationBoundary,QueryClient} from '@tanstack/react-query'


const Page = async() => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['habits'], 
        queryFn: getHabits, 
    })

    return <div className="flex flex-col justify-between items-center w-full h-full relative">
        
            <div className='flex flex-row justify-between absolute z-10 w-full'>
                <HeaderComponent page={'Weekly trackers'}/>
            </div>
            <div className="flex flex-col justify-center h-full w-full gap-5 mt-[20%] overflox-y-hidden">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <HabitOverview />
            </HydrationBoundary>
            </div>
            <div className='z-10 w-full'><BottomNav /></div>
    </div>
}

export default Page;