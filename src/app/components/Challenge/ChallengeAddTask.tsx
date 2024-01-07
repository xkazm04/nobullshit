import { HabitType } from "@/app/types/TrackerTypes"
import { BanIcon, CheckCheckIcon, EyeIcon, PlusCircleIcon } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { createTask } from "@/app/apiFns/taskApis"
import { useState } from "react"
import ConfirmationMini from "../form/ConfirmationMini"
import ConfirmationModal from "../form/ConfirmationModal"
import { Recommendation } from "./ChallengeAiRecommend"

type Props = {
    habit: HabitType,
    task: Recommendation,
    user: string
}

const ChallengeAddTask = ({ habit, task, user }: Props) => {
    const [success, setSuccess] = useState(false)
    const [removed, setRemoved] = useState(false)
    const mutation = useMutation({
        mutationFn: (taskInput) => createTask(taskInput, habit.id || ""),
        onSuccess: () => {
            console.log("success")
            setSuccess(true)
        },
        onError: () => {
            console.log("error")
        }
    })

    const addTask = () => {
        let taskInput = {
            name: task.name,
            habit_id: habit.id,
            user_id: user
        }
        mutation.mutate(taskInput)
    }

    const removeTask = () => {
        setRemoved(true)
    }
    return <>
        <ConfirmationModal trigger={<PlusCircleIcon className="cursor-pointer" size={26} />}
            content={<div className="p-2 flex flex-col gap-3">
                <div className="typo-label">{task.rationale}</div>
                {!success && !removed && <div className="px-5 rounded-lg flex gap-2 item-center justify-center">
                    <div onClick={addTask} className="button-icon">Add<PlusCircleIcon size={26} /></div>
                    <div onClick={addTask} className="button-icon">Known<EyeIcon size={26} /></div>
                    <div onClick={removeTask} className="button-icon">Remove<BanIcon size={26} /></div>
                </div>}
                {success && !removed && <div className="px-5 rounded-lg flex relative text-green-400">
                    <CheckCheckIcon className="cursor-pointer" size={26} />
                    <div className="absolute -bottom-1 right-0 text-xs">{success && "Added"}</div>
                </div>}
                {removed && <div className="px-5 rounded-lg flex relative text-red-400">
                    <BanIcon className="cursor-pointer" size={26} />
                    <div className="absolute -bottom-1 right-0 text-xs">{removed && "Removed"}</div>
                </div>}
            </div>}
        />
    </>
}

export default ChallengeAddTask