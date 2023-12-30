
import Today from '../components/Tracking/Habits/HabitsLayout';
import HeaderComponent from '../components/ui/header';
import { getHabits } from '../apiFns/habitApis';
import {dehydrate,HydrationBoundary,QueryClient} from '@tanstack/react-query'


const Page = async() => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['habits'], 
        queryFn: getHabits, 
    })

    return <div className='page'>
        <HeaderComponent page={'Daily'}/>
        <div className="flex flex-col gap-5 justify-start mt-20 overflox-y-hidden">
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Today/>
        </HydrationBoundary>
        </div>
    </div>
}

export default Page