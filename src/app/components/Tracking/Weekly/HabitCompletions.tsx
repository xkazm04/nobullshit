
import { HabitType } from "@/app/types/TrackerTypes"
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWeeklyCompletions } from "@/app/apiFns/compApis";
import HabitCompletion from "./HabitCompletion";

const HabitCompletions = ({habit}: {habit:HabitType}) => {
    const [completions, setCompletions] = useState([false, false, false, false, false]);
    const {data} = useQuery({
        queryKey: ['completions-week', habit.id],
        queryFn: () => getWeeklyCompletions(habit.id),
    })


    useEffect(() => {
        if (data) {
            const newCompletions = completions.map((_, index) => {
                const day = new Date();
                day.setDate(day.getDate() - index);
                const formattedDay = day.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
                return data.some(completion => completion.day === formattedDay && completion.completed);
            });
            setCompletions(newCompletions);
        }
    }, [data])

    return  <div className="flex flex-row justify-end gap-4 w-full">
    {completions.map((c: boolean, index: number) => (
        <HabitCompletion c={c} key={index} setCompletions={setCompletions} habit={habit} index={index} />
    ))}
</div>
}

export default HabitCompletions;