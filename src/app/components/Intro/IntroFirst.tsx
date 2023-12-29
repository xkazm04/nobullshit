import HabitSelection from "../Tracking/Habits/HabitSelection";


const IntroFirst = () => {

    return (
        <div className="flex flex-col items-center justify-start w-full h-full py-10 gap-10">
            <div className="typo-long">Start by adding your new goal</div>
            <HabitSelection/>
        </div>
    )
}

export default IntroFirst