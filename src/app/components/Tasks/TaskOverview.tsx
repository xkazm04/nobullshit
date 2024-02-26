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
import Spinner from "../Spinner";
import { useState } from "react";
import { getCategoryColor } from "@/app/lib/colorGetter";

export type TaskType = {
    id: string,
    name: string,
    state: boolean
}

const TaskOverview = () => {
    const userId = useGetUser()
    const [selectedHabit, setSelectedHabit] = useState<HabitType | null>(null);
    const { data, isLoading: tasksLoading } = useQuery({
        queryKey: ['tasks', userId],
        queryFn: () => getAllTasks(userId || '')
    })

    const { data: habits, isLoading: habitsLoading } = useQuery({
        queryKey: ['habits', userId],
        queryFn: () => getHabits(userId || ''),
        staleTime: Infinity
    });

    // Todo new task not working + fix styling
    const renderDialog = () => {
        if (selectedHabit) {
            return <Modal content={<TodoNew user={userId || ''} habit={selectedHabit} />} title={'Add new task'} description={""}  />;
        }
        return null;
    }

    const tasksByHabit = data ? groupBy(data, 'habit_id') : {};

    return <div className="flex flex-col gap-3 items-center w-full">
        <Dialog>
            {tasksLoading && <Spinner/>}   
            {renderDialog()}
            {!tasksLoading && !habitsLoading && habits && habits.map((habit: HabitType) => {
                // @ts-ignore
                const tasks = tasksByHabit[habit.id] || '';
                return <div key={habit.id} className="flex flex-row relative" onClick={() => setSelectedHabit(habit)}>
                    <div className="bg-gray-600/10 p-2 flex flex-row justify-between relative rounded items-center min-w-[350px] md:min-w-[500px]"
                        style={{ borderLeft: `2px solid ${getCategoryColor(habit.category)}` }}
                    >
                        <div className="text-xs md:text-sm">
                            <div className="min-w-[200px] font-sans" >{habit.name}</div>
                            {tasks && tasks.length > 0 && <Todos tasks={tasks} />}
                        </div>
                    </div>
                    <DialogTrigger>
                        <div className="px-3 rounded bg-gray-600/20 absolute right-0 top-0">+</div>
                    </DialogTrigger>
                </div>
            })}
        </Dialog>

    </div>
}

export default TaskOverview