import { useEffect, useState } from "react";
import ProgressBar from "../ProgressBar";
import Todo from "./Todo"
import { TaskType } from "@/app/types/TrackerTypes";

const Todos = ({tasks}) => {
    const [percentage, setPercentage] = useState(0)
    // Completed state does not persist

    useEffect(() => {
        if (tasks) {
            const completed = tasks.filter((task: TaskType) => task.state).length
            const total = tasks.length
            setPercentage((completed / total) * 100)
        }
    }, [tasks])

    return <>
        {tasks && tasks.map((task: TaskType) => (
            <Todo task={task} length={tasks.length} setPercentage={setPercentage} percentage={percentage} />
        ))}
        {tasks && tasks.length > 0 && <ProgressBar percentage={percentage}/>}
    </>
}

export default Todos