import TimerButton from "./TimerButton"
const TimerExamples = [
    {
        "category": 1,
        "time": 60,
        "task": "Task 1",
        "habitId": "1234"
    },
    {
        "category": 1,
        "time": 120,
        "task": "Task 2",
        "habitId": "1233"
    },
    {
        "category": 50,
        "time": 180,
        "task": "Task 3",
        "habitId": "1232"
    },
    {
        "category": 1,
        "time": 240,
        "task": "Task 4",
        "habitId": "1231"
    },
    {
        "category": 3,
        "time": 300,
        "task": "Task 5",
        "habitId": "1230"
    }
]

const Timer = () => {
    return <div className="flex flex-col justify-start items-center h-full mt-[10%] max-w-[800px]">
        <div className="flex flex-row flex-wrap justify-start gap-2">
            {TimerExamples.map((t) => (
               <div key={t.habitId}> <TimerButton  category={t.category} time={t.time} habitId={t.habitId} task={t.task} /></div>
            ))}
        </div>
    </div>
}

export default Timer