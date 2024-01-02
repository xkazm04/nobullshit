import { useEffect, useState } from "react";
import ProgressBar from "../ProgressBar";
import Todo from "./Todo"
import { TaskType } from "@/app/types/TrackerTypes";

type Props = {
    tasks: TaskType[]
}

const Todos = ({tasks}: Props) => {
    const [percentage, setPercentage] = useState(0)
    // Completed state does not persist

    useEffect(() => {
        if (tasks) {
            const completed = tasks.filter((task: TaskType) => task.completed).length;
            const total = tasks.length;
            setPercentage((completed / total) * 100);
        }
    }, [tasks]);

    return <div className="py-3 transition-all duration-300 ease-in">
        {tasks && tasks.map((task: TaskType) => (
            <Todo task={task} length={tasks.length} setPercentage={setPercentage} percentage={percentage} />
        ))}
        {tasks && tasks.length > 0 && <ProgressBar percentage={percentage}/>}
    </div>
}

export default Todos