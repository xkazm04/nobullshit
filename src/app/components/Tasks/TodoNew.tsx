'use client';
import { BanIcon, EarIcon, Link2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { createTask } from "@/app/apiFns/taskApis";
import { useMutation } from "@tanstack/react-query";
import { HabitType, TaskInput } from "@/app/types/TrackerTypes";

type Props = {
    habit: HabitType,
    user: string
}

const TodoNew = ({habit,user}:Props) => {
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [taskName, setTaskName] = useState('' as string)
    const [error, setError] = useState(false)
    const s = () => {
        setShow(!show)
    }

    const mutation = useMutation({
        mutationFn: (task: TaskInput) => createTask(task),
        onSuccess: () => {
            setSuccess(true)
        },
        onError: () => {
            setError(true)
        }
    })

    // Habit, User, Name, Created
    const handleChangeName = (e: any) => {
        e.preventDefault()
        setTaskName(e.target.value)
    }   

    const create = () => {
        setSuccess(false)
        setError(false)
        const newTask = {
            name: taskName,
            user_id: user,
            habit_id: habit.id || '',
        }
        mutation.mutate(newTask)
    }

    const recommend = () => {
        setLoading(true)
    }

    return (
        <div className="w-full min-h-[200px] z-10 flex flex-col items-center justify-center bg-gray-600/10 rounded-xl p-5
                animate-fadeIn transition-all duration-500 gap-5">
            <div className="flex flex-row justify-center relative gap-1">
                <div><input className="input" placeholder="Enter a name" onChange={(e) => handleChangeName(e)}/></div>
                <div className="absolute text-xs right-0 top-[-25px] italic font-mono">{habit.name}</div>
            </div>
            <div className="flex flex-row justify-between gap-5">
                <button className="btn-action" onClick={()=>{recommend()}}><EarIcon/></button>
                <button className="btn-action" onClick={s}><BanIcon/></button>
                <button className="btn-action" onClick={create}><PlusIcon/></button>
            </div>
            {success && <div className='alert-success max-w-[500px]'>Task created!</div>}
        </div>
    );
}

export default TodoNew