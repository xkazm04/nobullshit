import { useQuery } from "@tanstack/react-query";
import Task from "./HabitTask";
import { getHabitTasks } from "@/app/apiFns/taskApis";
import { useState } from "react";


const HabitTasks = ({ habitId }: any) => {
    const [tasksCompleted, setTasksCompleted] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [comp, setComp] = useState(false);
    const loadingCoeficient = 1.5

    const { data, error, isLoading } = useQuery({
        queryKey: ['habit-tasks'],
        queryFn: () => getHabitTasks(habitId)
    })

    /// Number of tasks with completed = true
    // const numberCompleted = data.filter((task) => task.completed === true).length;

    return <div>
        {tasksCompleted > 0 &&
            <div className="absolute bottom-2 left-[30%]">
                <div className="text-xs text-gray-500 ml-[70px]">{percentage} %</div>
                <div className="w-[150px] h-[0.7px] bg-gray-800 z-20" />
                <div
                    style={{ width: `${percentage * loadingCoeficient}px` }}
                    className={`h-[0.5px] ${comp ? 'bg-green-500' : 'bg-gray-100'} z-0 transition-all duration-500 ease-in-out`}
                />
            </div>}
        {!isLoading && data && data.map((task: any) => (
            <div key={task.id}>
                <Task
                    id={task.id}
                    task={task}
                    length={data.length}
                    setPercentage={setPercentage}
                    percentage={percentage}
                    complete={task.completed} // Add the missing 'complete' property
                />
            </div>
        ))}
        {error && <div className="alert-error">API error</div>}
    </div>
}

export default HabitTasks;