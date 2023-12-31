'use client';
import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from "@/app/apiFns/taskApis";
import Todo from "./Todo";
import useGetUser from "@/app/lib/hooks/useGetUser";
import { getHabits } from "@/app/apiFns/habitApis";
import TodoNew from "./TodoNew";
import { groupBy } from 'lodash';


export type TaskType = {
    id: string,
    name: string,
    state: boolean
}

const TaskOverview = () => {
    const userId = useGetUser()
    const { data, error, isLoading } = useQuery({
        queryKey: ['tasks', userId],
        queryFn: () => getAllTasks(userId || '')
    })

    const { data: habits, error: habitsError } = useQuery({
        queryKey: ['habits', userId],
        queryFn: () => getHabits(userId || '')
    })

    // Todo new task not working + fix styling

    const tasksByHabit = data ? groupBy(data, 'habitId') : {};

    return <div className="flex flex-col gap-3">
        {habits && habits.map(habit => (
            <div key={habit.id} className="bg-gray-600/10 p-2">
                <div className="text-xs">{habit.name}</div>
                {tasksByHabit[habit.id] && tasksByHabit[habit.id].length > 0 ? tasksByHabit[habit.id].map((task: TaskType) => (<>
                    <div key={task.id}>
                        <Todo task={task} />
                    </div>
                    <div className='z-10 w-full'>
                        <div><TodoNew user={userId} habit={habit.id} /></div>
                    </div></>))
                    : <div>No tasks</div>
                }
            </div>
        ))}

        {error && <div className="alert-error">API error</div>}
    </div>
}

export default TaskOverview