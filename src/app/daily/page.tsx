
import HabitsLayout from '../components/Tracking/Habits/HabitsLayout';
import HeaderComponent from '../components/ui/header';

const Page = async() => {

    return <div className='page'>
        <HeaderComponent page={'Daily'}/>
        <div className="flex flex-col gap-5 justify-start mt-20 overflox-y-hidden">
            <HabitsLayout/>
        </div>
    </div>
}

export default Page