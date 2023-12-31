'use client';
import { BanIcon, EarIcon, Link2Icon, PlusCircleIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { createTask } from "@/app/apiFns/taskApis";
import { useMutation } from "@tanstack/react-query";
import { TaskInput } from "@/app/types/TrackerTypes";

type Props = {
    habit: string,
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

    const create = () => {
        setSuccess(false)
        setError(false)
        const newTask = {
            name: taskName,
            user: user,
            habit: habit,
        }
        mutation.mutate(task)
    }

    const recommend = () => {
        setLoading(true)
    }

    const Form = () => {
        return <div 
            className="w-full min-h-[200px] z-10 flex flex-col items-center justify-center bg-black bg-opacity-50
                animate-fadeIn transition-all duration-500 gap-5">
            <div className="flex flex-row justify-center relative gap-1">
                <div><input className="input" placeholder="Enter a name" onChange={(e)=>{setTaskName(e.target.value)}}/></div>
                <div className="absolute text-xs right-0 top-[-25px] italic font-mono">{habit}</div>
            </div>
            <div className="flex flex-row justify-between gap-5">
                <button className="btn-action" onClick={()=>{recommend()}}><EarIcon/></button>
                <button className="btn-action" onClick={s}><BanIcon/></button>
                <button className="btn-action" onClick={create}><PlusIcon/></button>
            </div>
        </div>
    }

    return (
        <div className="flex flex-row justify-end">
             {!show && <button className="absolute btn-action z-20 bottom-[10%]" onClick={s}><PlusCircleIcon /></button>}
                {show && <Form key="newTodoForm" />}
        </div>
    );
}

export default TodoNew