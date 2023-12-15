import GoalNew from "../Tracking/Habits/HabitNew"
type Props = {
    setCondition: (condition: boolean) => void
}
const IntroFirst = ({setCondition}:Props) => {

    return (
        <div className="flex flex-col items-center justify-start w-full h-full py-10 gap-10">
            <div className="typo-long">Start by adding your new goal</div>
            <GoalNew setFn={setCondition} />
        </div>
    )
}

export default IntroFirst