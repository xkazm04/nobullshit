import Checkmark from "../../form/Checkmark"
import { createCompletion, getDayCompletion } from "@/app/apiFns/compApis";
import { CompType, HabitType } from "@/app/types/TrackerTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ConfirmationModal from "../../form/ConfirmationModal";
import Divider from "../../animations/Divider";

type Props = {
    habit: HabitType,
    setError: any,
    day: string,
}

const HabitCompletion = ({habit, setError, day}: Props) => {
    const today = new Date().toISOString().slice(0, 10)
    const [comp, setComp] = useState(false)
    const {data} = useQuery({
        queryKey: [`completion-${habit.id}-${today}`],
        queryFn: () => getDayCompletion({habitId: habit.id || '', day: day})
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
                day: day,
                completed: !comp,
                volume_actual: habit.volume_actual ? habit.volume_actual : undefined,
                volume_units: habit.volume_units ? habit.volume_units : undefined,
            }
            mutation.mutate(completion)
        } catch (error) {
            console.log(error)
        }
    }
    return <>
        {habit.volume_actual ? 
        <ConfirmationModal 
            trigger={<Checkmark condition={comp} check={complete} />} 
            content={<div className="flex flex-col items-start">
                <div>{habit.volume_actual} {habit.volume_units}</div>
                <Divider />
                <div className="text-xs">Change volume</div>
            </div>}/> :   
        <Checkmark condition={comp} check={complete} />}
    </>
}

export default HabitCompletion