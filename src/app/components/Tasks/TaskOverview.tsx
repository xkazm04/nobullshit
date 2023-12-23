'use client';
import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from "@/app/apiFns/taskApis";
import Todo from "./Todo";

export type TaskType = {
    id: string,
    name: string,
    state: boolean
}

const TaskOverview = () => {
    const {data, error, isLoading} = useQuery({
        queryKey: ['tasks'],
        queryFn: getAllTasks
    })
    
    return <>
        {data && !isLoading && data.map((task: TaskType) => (
            <div key={task.id}><Todo task={task}/></div>
        ))}
        {error && <div className="alert-error">API error</div>}
    </>
}

export default TaskOverview