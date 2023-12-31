import Checkmark from "../form/Checkmark"
import { TaskType } from "./TaskOverview"
import { useState } from "react"
import { updateTaskState } from "@/app/apiFns/taskApis"
import { useMutation } from "@tanstack/react-query"
import { TaskUpdate } from "@/app/types/TrackerTypes"
import { BanIcon, PenIcon } from "lucide-react"
import { FormTextInput } from "../form/FormTextInput"

const Todo = ({ task }: { task: TaskType }) => {
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
        mutation.mutate(taskUpdate)
    }

    const handleNewName = () => {
        const taskUpdate = {
            name: newName,
        }
        mutation.mutate(taskUpdate)

    }
    return <div key={task.id} className="">
        <div className="p-3 flex flex-row justify-start gap-5 border-t  border-gray-700 bg-gray-950/20  relative w-full">
            <div className="flex flex-row justify-between gap-2 w-full">
                {!showEdit ? <>
                    {!checked  ? <div className="text-gray-200">{task.name}</div> :
                        <div className="text-gray-500 line-through">{task.name}</div>}
                </> :
                    <div className="flex flex-row gap-2">
                        <FormTextInput type="text" label={`Edit name - ${task.name}`} setNew={setNewName} />
                        <button className="btn-action" onClick={() => handleNewName()}>Save</button>
                    </div>}
                <div className="flex flex-row gap-5 px-5">
                    {!showEdit ? <> <div onClick={() => { setShowEdit(true) }}><PenIcon size={16} /></div>
                        <Checkmark check={check} condition={checked} /></> : 
                        <div onClick={()=>{setShowEdit(false)}}><BanIcon/></div>}
                </div>
            </div>
        </div>
        {error && <div className="alert-error">API error</div>}
    </div>
}

export default Todo