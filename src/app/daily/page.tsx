
import Today from '../components/Tracking/Habits/HabitsLayout';
import BottomNav from '../components/BottomNav';
import HeaderComponent from '../components/ui/header';
import { getHabits } from '../apiFns/habitApis';
import {dehydrate,HydrationBoundary,QueryClient} from '@tanstack/react-query'


const Page = async() => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['habits'], 
        queryFn: getHabits, 
    })

    return <div className='relative flex flex-col justify-between h-full'>
        <HeaderComponent page={'Daily'}/>
        <div className="flex flex-col gap-5 justify-start mt-20 max-h-[700px] overflox-y-hiddenw">
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Today/>
        </HydrationBoundary>
        </div>
        <div className='z-10 w-full'><BottomNav /></div>
    </div>
}

export default Page