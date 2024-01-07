import HeaderComponent from "../components/ui/header"
import TaskOverview from "../components/Tasks/TaskOverview"


const Page = async () => {
    return <div className="page">
        <HeaderComponent page={'Tasks'} />
        <div className="flex flex-col mt-[20%] w-full">
            <div className='typo-long'>Simple todolist, like thousands of others</div>
            <div className='gap-1 py-5 w-full'>
                    <TaskOverview />
            </div>
        </div>
    </div>
}

export default Page