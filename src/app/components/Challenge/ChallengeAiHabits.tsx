import useGetUser from "@/app/lib/hooks/useGetUser"
import { useQuery } from "@tanstack/react-query"
import { getHabits } from "@/app/apiFns/habitApis"
import ChallengeAiRecommend from "./ChallengeAiRecommend"
import { useEffect, useState } from "react"
import { HabitType } from "@/app/types/TrackerTypes"

const ChallengeAiHabits = () => {
    const [active, setActive] = useState('')
    const [activeHabit, setActiveHabit] = useState<HabitType | null>(null)
    const user = useGetUser()
    // Get all habits -> List them, generate recommendation
    const { data: habits } = useQuery({
        queryKey: ['habits', user],
        queryFn: () => getHabits(user || '')
    })

    const activate = (habit: HabitType) => {
        setActive(habit.name)
        setActiveHabit(habit)
    }

    useEffect(() => {
        if (habits && habits.length > 0){
            setActive(habits[0].name)
            setActiveHabit(habits[0])
        }
        //@ts-ignore
    }, [])

    return <>
        Boilerplate
        <div className="flex flex-row flex-wrap p-4 gap-2">
            {habits && habits.map((habit: HabitType) => (
                <div key={habit.id} onClick={()=>{activate(habit)}}
                    className={`${active == habit.name ? 'bg-gray-950/80 text-main' : 'bg-gray-600/10'} 
                    rounded-xl border border-gray-600/50 text-xs p-2 
                    transition-all duration-200 ease-in-out hover:bg-gray-600/20 cursor-pointer`}
                >
                    {habit.name}
                </div>
            ))}
        </div>
        {active != '' && activeHabit && <ChallengeAiRecommend habit={activeHabit} user={user} />}
    </>
}

export default ChallengeAiHabits