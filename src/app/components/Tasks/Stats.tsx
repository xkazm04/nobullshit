import { HabitType, TaskType } from "@/app/types/TrackerTypes"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import MiniCard from "../MiniCard"
import { useQuery } from "@tanstack/react-query"
import { getStats } from "@/app/apiFns/supportApis"

const statsExample = {
    "habit_id": "17774e8a-0750-45b2-913e-87981894d1b9",
    "category": "Coding",
    "habit_name": "React development #2",
    "total_instances": 1,
    "completed_instances": 3,
    "completed_volume": 10,
    "volume_units": "hours",
    "weeks_elapsed": 0
}

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


const TasksStats = ({ habit }: { habit: HabitType }) => {
    // Navázat na habit -> Nebo udělat celkové stats

    const { data: stats, isLoading } = useQuery({
        queryKey: ['stats', habit.id],
        queryFn: () => getStats(habit.id || ''),
        staleTime: Infinity
    })
    
    // Color by categories
    // Take only the last 7 days -> Maybe adjust db with tasks to log completed items

    return <AnimatePresence>
        <div className="typo-long">Habit stats</div>
       <motion.div className='h-[0px] overflow-hidden flex flex-col gap-3 items-center'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto', minHeight: '150px' }}
            exit={{ opacity: 0, height: 0 }}
        >
            {!isLoading && stats && <div className="grid grid-cols-2 gap-3">
                <MiniCard stat={stats.completed_instances} title='completed' />
                <MiniCard stat={stats.total_instances} title='total' />
            </div>}
        </motion.div>

    </AnimatePresence>
}

export default TasksStats