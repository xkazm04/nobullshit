'use client';
import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from "@/app/apiFns/taskApis";
import useGetUser from "@/app/lib/hooks/useGetUser";
import { getHabits } from "@/app/apiFns/habitApis";
import TodoNew from "./TodoNew";
import { groupBy } from 'lodash';
import { Dialog } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Modal from "../Modal";
import { HabitType } from "@/app/types/TrackerTypes";
import Todos from "./Todos";



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

    // Todo new task not working + fix stylingS
    const renderDialog = (habit: HabitType) => {
        return <Modal content={<TodoNew user={userId} habit={habit} title="" description="" />} />
    }

    const tasksByHabit = data ? groupBy(data, 'habit_id') : {};

    return <div className="flex flex-col gap-3 items-center">
        <Dialog>
            {habits && habits.map((habit: HabitType) => {
                const tasks = tasksByHabit[habit.id] || [];
                return <div className="flex flex-row relative">
                    <div key={habit.id} className="bg-gray-600/10 p-2 flex flex-row justify-between relative rounded-xl items-center min-w-[350px]">
                        {renderDialog(habit)}
                        <div className="text-xs">
                            {habit.name}
                            {tasks && tasks.length > 0 && <Todos tasks={tasks} />}
                        </div>
                    </div>
                    <DialogTrigger>
                        <div className="px-5 rounded-lg bg-gray-600/20 absolute right-0 top-0">+</div>
                    </DialogTrigger>
                </div>
            })}
        </Dialog>
    </div>
}

export default TaskOverview