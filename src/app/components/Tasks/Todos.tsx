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
    const [comp, setComp] = useState(0)
    // Completed state does not persist

    useEffect(() => {
        if (tasks) {
            const completed = tasks.filter((task: TaskType) => task.completed).length;
            const total = tasks.length;
            setPercentage((completed / total) * 100);
            setComp(completed)
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
        <div className="flex flex-row w-full absolute h-[20px] min-w-[335px] cursor-pointer hover:bg-slate-950/20 transition-colors duration-300 ease-in-out"
            onClick={() => setExpanded(!expanded)}>
                {tasks && tasks.length > 0 && <ProgressBar percentage={percentage}/>}
                {tasks && tasks.length > 0 && <div className="text-xs text-gray-500 absolute bg-gray-950 px-2 right-0 -bottom-1">{comp}/{tasks.length}</div>}
        </div>
    </div>
}

export default Todos