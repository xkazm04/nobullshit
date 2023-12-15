import GoalNew from "../Tracking/GoalNew"

const IntroFirst = () => {

    return (
        <div className="flex flex-col items-center justify-start w-full h-full py-10 gap-10">
            <div className="typo-long">Start by adding your new goal</div>
            <GoalNew/>
        </div>
    )
}

export default IntroFirst