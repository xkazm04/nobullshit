import { TaskType } from "@/app/types/TrackerTypes"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import MiniCard from "../MiniCard"

type Props = {
    tasks: TaskType[]
}

const TasksStats = ({ tasks }: Props) => {
    const [expanded, setExpanded] = useState(false)
    const [completed, setCompleted] = useState(0)
    const [pending, setPending] = useState(0)

    const expand = () => {
        setExpanded(!expanded)
        setCompleted(tasks.filter(task => task.completed).length)
        setPending(tasks.filter(task => !task.completed).length)
    }
    
    // Color by categories
    // Take only the last 7 days -> Maybe adjust db with tasks to log completed items

    return <AnimatePresence>
        <button onClick={expand} className="typo-long">Weekly stats</button>
        {expanded && <motion.div className='h-[0px] overflow-hidden flex flex-col gap-3 items-center'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto', minHeight: '150px' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <div className="grid grid-cols-2 gap-3">
                <MiniCard stat={completed} title='completed' />
                <MiniCard stat={pending} title='pending' />
            </div>
        </motion.div>}

    </AnimatePresence>
}

export default TasksStats