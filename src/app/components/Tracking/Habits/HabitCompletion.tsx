import Checkmark from "../../form/Checkmark"
import { createCompletion, getCompletion } from "@/app/apiFns/compApis";
import { CompType, HabitType } from "@/app/types/TrackerTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Props = {
    habit: HabitType,
    setError: any
}

const HabitCompletion = ({habit, setError}: Props) => {
    const today = new Date().toISOString().slice(0, 10)
    const [comp, setComp] = useState(false)
    const {data} = useQuery({
        queryKey: [`completion-${habit.id}-${today}`],
        queryFn: () => getCompletion(habit.id || '')
    })

    useEffect(() => {
        if (data) {
            setComp(data.completed)
        }
    }, [data])

    const mutation = useMutation({
        mutationFn: (completion: CompType) => createCompletion(completion),
        onSuccess: () => {
            setComp(!comp)
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
                day: today,
                completed: !comp,
            }
            mutation.mutate(completion)
        } catch (error) {
            console.log(error)
        }
    }
    return <>
        <Checkmark condition={comp} check={complete} />
    </>
}

export default HabitCompletion