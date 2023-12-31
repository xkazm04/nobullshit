import HeaderComponent from "../components/ui/header"
import TaskOverview from "../components/Tasks/TaskOverview"


const Page = async () => {
    return <div className="page">
        <HeaderComponent page={'Tasks'} />
        <div className="flex flex-col mt-[20%]">
            <div className='typo-long'>Simple todolist, like thousands of others</div>
            <div className='flex flex-col gap-1 py-5'>
                    <TaskOverview />
            </div>
        </div>
    </div>
}

export default Page