import { getHabitRecommendation } from "@/app/apiFns/aiApis"
import { HabitType } from "@/app/types/TrackerTypes"
import { useQuery } from "@tanstack/react-query"
import Spinner from "../Spinner"
import { useEffect, useState } from 'react'

type Props = {
    habit: HabitType,
}

const ChallengeAiRecommend = ({habit}:Props) => {
    const { data, isLoading } = useQuery({
        queryKey: ['habit-ai-recommendation', habit],
        queryFn: () => getHabitRecommendation(habit.id || "")
    })
    const [recommendation, setRecommendation] = useState([])

    useEffect(() => {
        if (data) {
            console.log(data);
            setRecommendation(data)
            console.log(habit.id)
        }
    }, [data]);
    
    return <>
        {data && <div className="alert-success">Data fetched</div>}
        {data && <div>{recommendation}</div>}
        {isLoading && <div><Spinner/></div>}
    </>
}

export default ChallengeAiRecommend