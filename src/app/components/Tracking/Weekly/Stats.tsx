import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import MiniCard from "../../MiniCard"
import { useQuery } from "@tanstack/react-query"
import { getStats } from "@/app/apiFns/supportApis"
import Divider from "../../animations/Divider"
import { getHabitRecommendation } from "@/app/apiFns/aiApis"
import AiResponse from "../AiResponse"

type Stat = {
    habit_id: string,
    category: string,
    habit_name: string,
    total_instances: number,
    completed_instances: number,
    completed_volume: number,
    volume_units: string,
    weeks_elapsed: number
}


const Stats = ({ habitId }: { habitId: string }) => {
    // Navázat na habit -> Nebo udělat celkové stats
    const [showRec, setShowRec] = useState(false)
    const { data: stats, isLoading } = useQuery({
        queryKey: ['stats', habitId],
        queryFn: () => getStats(habitId || ''),
        staleTime: Infinity
    })

    const { data: rec, isLoading: recLoading } = useQuery({
        queryKey: ['recommendation', habitId],
        queryFn: () => getHabitRecommendation(habitId || ''),
        staleTime: Infinity
    })

    const action = () => {
        console.log('action')
        console
    } 
    
    // Color by categories
    // Take only the last 7 days -> Maybe adjust db with tasks to log completed items

    return <AnimatePresence>
       <motion.div className='h-[0px] flex flex-col gap-3 items-center p-2'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto', minHeight: '150px' }}
            exit={{ opacity: 0, height: 0 }}
        >
            {!isLoading && stats && <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 lg:gap-5">
                <MiniCard stat={`${stats.completed_instances}/${stats.total_instances}`}  title='completed' subtitle="repetitions" />
                {stats.volume_units && <MiniCard stat={stats.completed_volume} title={stats.volume_units} subtitle="volume" />}
                <MiniCard stat={stats.weeks_elapsed} title='weeks' subtitle="elapsed" />
            </div>}
        </motion.div>
        <Divider />
        <div className="typo-long" onClick={()=>setShowRec(true)}>Show advice</div>
        {showRec && !recLoading && rec && <div className="flex flex-col gap-3 items-center p-2">
            {JSON.parse(rec).map((r, index) => <AiResponse key={index} item={r} action={action} />)}
        </div>}

    </AnimatePresence>
}

export default Stats