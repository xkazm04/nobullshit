import Checkmark from "../form/Checkmark"
import { useEffect, useState } from "react"
import { updateTaskState } from "@/app/apiFns/taskApis"
import { useMutation } from "@tanstack/react-query"
import { TaskType, TaskUpdate } from "@/app/types/TrackerTypes"
import { BanIcon, CheckCheckIcon, PenIcon } from "lucide-react"
import { useRef } from 'react';

type Props = {
    task: TaskType,
    setPercentage: (percentage: number) => void
    length: number
    percentage: number
}


const Todo: React.FC<Props> = ({ task, setPercentage, length, percentage }) => {
    const [checked, setChecked] = useState(false)
    const [newName, setNewName] = useState('' as string)
    const [showEdit, setShowEdit] = useState(false)
    const [error, setError] = useState(false)
    const mutation = useMutation({
        mutationFn: (update: TaskUpdate) => updateTaskState(update, task.id),
        onSuccess: () => {
            setChecked(!checked)
            setError(false)
        },
        onError: () => {
            setError(true)
        }
    })
    const check = () => {
        const taskUpdate = {
            completed: !checked
        }
        if (!checked) {
            setPercentage(percentage + 100 / length)
        } else {
            setPercentage(percentage - 100 / length)
        }
        mutation.mutate(taskUpdate)
    }

    useEffect(() => {
        setChecked(task.completed)
    }, [task])

    const inputRef = useRef(null);

    const handleEditClick = () => {
        setShowEdit(true);
        setNewName(task.name);
        //@ts-ignore
        setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
    };

    const handleNewName = () => {
        const taskUpdate = {
            name: newName,
        }
        mutation.mutate(taskUpdate)

    }
    return <>
    <div key={task.id} className="flex flex-row justify-between gap-2 pl-7 py-1 border-t  border-gray-700/80 bg-gray-950/20 relative w-full min-w-[320px]">
        {!showEdit ? (
            !checked ? <div className="text-gray-200">{task.name}</div> :
            <div className="text-gray-500 line-through">{task.name}</div>
        ) : (
            <input
                ref={inputRef}
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onBlur={handleNewName}
                className="text-gray-200 bg-transparent border-none"
            />
        )}
        <div className="flex flex-row gap-5 px-5 z-20">
            {!showEdit ? (
                <>
                    <div onClick={handleEditClick}><PenIcon size={20} /></div>
                    <Checkmark check={check} condition={checked} />
                </>
            ) : (
                <div onClick={() => { setShowEdit(false); }}><CheckCheckIcon size={18} /></div>
            )}
        </div>
    </div>
    {error && <div className="alert-error">API error</div>}
</>
}

export default Todo