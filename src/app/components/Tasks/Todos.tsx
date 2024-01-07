import { useEffect, useState } from "react";
import ProgressBar from "../ProgressBar";
import Todo from "./Todo"
import { TaskType } from "@/app/types/TrackerTypes";
import { ArrowDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
    tasks: TaskType[]
}

const Todos = ({tasks}: Props) => {
    const [percentage, setPercentage] = useState(0)
    const [expanded, setExpanded] = useState(false)
    // Completed state does not persist

    useEffect(() => {
        if (tasks) {
            const completed = tasks.filter((task: TaskType) => task.completed).length;
            const total = tasks.length;
            setPercentage((completed / total) * 100);
        }
    }, [tasks]);

    return <div className="py-3 transition-all duration-300 ease-in">
        <AnimatePresence>
        {tasks && expanded && tasks.map((task: TaskType) => (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                key={task.id}
            >
                <Todo task={task} length={tasks.length} setPercentage={setPercentage} percentage={percentage} />
            </motion.div>
        ))}
        </AnimatePresence>
        <div className="flex flex-row w-full min-w-[335px]" onClick={() => setExpanded(!expanded)}>
                {tasks && tasks.length > 0 && <ProgressBar percentage={percentage}/>}
            <div className="text-xs text-gray-500 flex flex-row cursor-pointer hover:opacity-50 rounded-xl bg-gray-950 p-1 absolute right-0 bottom-0">
                <div>+{tasks.length}</div> 
                <div>
                    {!expanded ? <ArrowDown className="inline-block" size={12} /> : 
                    <ArrowDown className="inline-block transform rotate-180" size={12} />}
                </div>
            </div>
        </div>
    </div>
}

export default Todos