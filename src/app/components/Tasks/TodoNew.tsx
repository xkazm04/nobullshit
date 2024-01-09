'use client';
import { ArrowRightIcon, BanIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { createTask } from "@/app/apiFns/taskApis";
import { useMutation, useQuery } from "@tanstack/react-query";
import { HabitType, TaskInput } from "@/app/types/TrackerTypes";
import { getHabitTaskRecommendation } from "@/app/apiFns/aiApis";
import Spinner from "../Spinner";

type Props = {
    habit: HabitType,
    user: string
}

const TodoNew = ({habit,user}:Props) => {
    const [show, setShow] = useState(false)
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

    const { data: recommendation, isLoading: recommendationLoading } = useQuery({
        queryKey: ['recommendation', habit.id],
        queryFn: () => getHabitTaskRecommendation(habit.id || ''),
        staleTime: Infinity
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


    return (
        <div className="w-full min-h-[200px] z-10 flex flex-col items-center justify-center bg-gray-600/10 rounded-xl p-5
                animate-fadeIn transition-all duration-500 gap-5">
            <div className="flex flex-row justify-center relative gap-1">
                <div><input className="input" placeholder="Enter a name" onChange={(e) => handleChangeName(e)} value={taskName}/></div>
                <div className="absolute text-xs right-0 top-[-25px] italic font-mono">{habit.name}</div>
            </div>
            <div className="flex flex-row justify-between gap-5">
                <button className="btn-action text-red-600 gap-2" onClick={s}><BanIcon size={18}/>Cancel</button>
                <button className="btn-action gap-2" onClick={create}><PlusIcon size={20}/>Add</button>
            </div>
            {success && <div className='alert-success max-w-[500px]'>Task created!</div>}
            {recommendationLoading && <div>Recommendations loading <Spinner/></div>}
            {!recommendationLoading && recommendation && <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-2 text-sm font-sans">
                {JSON.parse(recommendation).map((item, index) => (
                    <div key={index}>
                        <div onClick={()=>{setTaskName(item.name)}} className="text-main bg-gray-800/70 px-4 py-1 rounded my-1 flex gap-3 md:cursor-pointer md:hover:text-main/90">{item.name} <ArrowRightIcon/></div>
                        <div className="tracking-wider text-gray-100 text-xs">{item.description}</div>
                        <br/>
                        <div className="tracking-wider text-gray-100 text-xs">{item.rationale}</div>
                    </div>
                ))}
            </div>
            </div>}
        </div>
    );
}

export default TodoNew