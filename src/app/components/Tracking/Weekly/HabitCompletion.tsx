import { CheckCheckIcon, XCircleIcon } from "lucide-react";
import { getCategoryColor } from "@/app/lib/colorGetter";
import { useMutation } from "@tanstack/react-query";
import { createCompletion } from "@/app/apiFns/compApis"
import { useState } from "react";
import { CompType, HabitType } from "@/app/types/TrackerTypes";

type Props = {
    c: boolean,
    setCompletions: any,
    habit: HabitType
    index: number
}

const HabitCompletion = ({c, setCompletions, habit, index}:Props) => {
    const [error, setError] = useState(false)
    const findDayFromIndex = (index: number) => {
        const day = new Date();
        day.setDate(day.getDate() - index);
        return day.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
    }
    const mutation = useMutation({
        mutationFn: (completion: CompType) => createCompletion(completion),
        onSuccess: () => {
            setCompletions((completions: boolean[]) => {
                const newCompletions = [...completions]
                newCompletions[index] = !c
                return newCompletions
            })
        },
        onError: () => {
            setError(true)
        }
    })
    const complete = async () => {
        setError(false)
        try {
            const completion: CompType = {
                habit_id: habit.id || '',
                day: findDayFromIndex(index),
                completed: !c,
            }
            mutation.mutate(completion)
        } catch (error) {
            console.log(error)
        }
    }
    return <>
        <button className="bg-slate-900 p-1 rounded-xl"
            onClick={complete}
            style={error ? {border: '1px solid red'} : {}}
        >
            {c ? 
                <CheckCheckIcon className="h-4 w-4 " style={{ color: getCategoryColor(habit.category) }} /> : 
                <XCircleIcon className="h-4 w-4 text-gray-500" />}
        </button></>
}

export default HabitCompletion