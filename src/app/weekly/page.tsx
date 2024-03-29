import HabitOverview from "../components/Tracking/Weekly/HabitOverview";
import HeaderComponent from "../components/ui/header";

const Page = async() => {

    return <div className="page">
            <div className='flex flex-row justify-between absolute z-10 w-full'>
                <HeaderComponent page={'Weekly habits'}/>
            </div>
            <div className="flex flex-col justify-center h-full w-full gap-5 my-[10%] overflox-y-hidden">
                <HabitOverview />
            </div>
    </div>
}

export default Page;