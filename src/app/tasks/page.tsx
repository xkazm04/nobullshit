import BottomNav from "../components/BottomNav"
import TodoNew from "../components/Tasks/TodoNew"
import HeaderComponent from "../components/ui/header"
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getAllTasks } from "../apiFns/taskApis"
import TaskOverview from "../components/Tasks/TaskOverview"


const Page = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['habits'],
        queryFn: getAllTasks,
    })
    return <div className="page">
        <HeaderComponent page={'Tasks'} />
        <div className="flex flex-col mt-[20%]">
            <div className='typo-long'>Simple todolist, like thousands of others</div>
            <div className='flex flex-col gap-1 py-5'>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <TaskOverview />
                </HydrationBoundary>
            </div>
        </div>
        <div className='z-10 w-full'>
            <div><TodoNew /></div>
        </div>
    </div>
}

export default Page