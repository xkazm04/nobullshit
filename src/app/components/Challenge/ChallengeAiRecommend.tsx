import { getHabitRecommendation } from "@/app/apiFns/aiApis"
import { HabitType } from "@/app/types/TrackerTypes"
import { useQuery } from "@tanstack/react-query"
import Spinner from "../Spinner"
import { useEffect, useState } from 'react'
import ChallengeAddTask from "./ChallengeAddTask"


type Props = {
    habit: HabitType,
    user: string
}

export type Recommendation = {
    name: string, 
    description: string, 
    rationale: string,
}

const ChallengeAiRecommend = ({habit, user}:Props) => {
    const { data, isLoading } = useQuery({
        queryKey: ['habit-ai-recommendation', habit],
        queryFn: () => getHabitRecommendation(habit.id || "")
    })
    const [recommendation, setRecommendation] = useState<Recommendation[]>([]) // Add type annotation here

    useEffect(() => {
        if (data) {
            try {
                const parsedData = JSON.parse(data);
                setRecommendation(parsedData);
            } catch (error) {
                console.error("Failed to parse JSON data:", error);
            }
        }
    }, [data]);
    
    return <>
    <div className="flex flex-col gap-2 justify-start">
        {recommendation && recommendation.map((item, index) => (
            <div className="flex justify-start text-left">
                <div key={index} 
                className="bg-gray-950 p-2 flex flex-col justify-between relative rounded-xl items-start text-sm w-full min-w-[350px]">
                    <div>{item.name}</div> 
                    <div className="text-xs text-gray-300">{item.description}</div>
                </div>
                <ChallengeAddTask habit={habit} task={item} user={user} />
             </div>
        ))}
    </div>
    {isLoading && <div><Spinner/></div>}
    </>
}

export default ChallengeAiRecommend