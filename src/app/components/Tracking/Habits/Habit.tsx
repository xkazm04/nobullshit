'use client';
import { useState } from "react"
import { ArrowRightIcon, Maximize2Icon, PlusCircle, ScrollTextIcon } from "lucide-react";
import Checkmark from "../../form/Checkmark";
import Task from "../Task";
import { FormTextInput } from "../../form/FormTextInput";
import { apiRequest } from "@/app/lib/callers";
import ConfirmationMini from "../../form/ConfirmationMini";
import { motion, AnimatePresence } from "framer-motion"
import { HabitType } from "@/app/types/TrackerTypes";


const taskExamples = [
    { id: 1, name: 'Task 1', completed: true },
    { id: 2, name: 'Task 2', completed: false }, // Optional value
]

// Task On complete remove + return back 
// + Create note
// note -> Text, Date, Boolean

const Habit = ({ habit }: { habit: HabitType }) => {
    const [comp, setComp] = useState(false)
    const [tasks, setTasks] = useState(taskExamples)
    const [expanded, setExpanded] = useState(false)
    const [showNote, setShowNote] = useState(false)
    const [newNote, setNewNote] = useState('' as string)
    const [noteColor, setNoteColor] = useState('#EEFF87' as string)
    const [newTaskName, setNewTaskName] = useState('' as string)
    const loadingCoeficient = 1.5
    const hasTasks = tasks.length > 0
    const [percentage, setPercentage] = useState(0)
    const [noteSent, setNoteSent] = useState(false)
    const mainColor = '#EEFF87'
    // If note active, stronger stroke width of the icon 
    const check = (action: boolean) => {
        if (action === true) {
            setComp(true)
        } else {
            setComp(false)
        }
    }

    const completeTask = ({ id }) => {
        setTasks(tasks.map((task) => {
            if (task.id === id) {
                task.completed = !task.completed
            }
            return task
        }))
    }

    const removeGoal = () => {
        console.log('Goal removed')
    }

    const addTask = () => {
        console.log('Task added')
    }

    const noteExample = {
        "habitId": "e500ee8a-0898-4e3c-9fcc-7a62b9bfbf0c",
        "created": "2022-01-01T00:00:00Z",
        "text": "This is a note."
    }

    const sendNote = async () => {
        console.log('Note sent')
        const addedNote = {
            "habitId": habit.habitId,
            "created": new Date().toISOString(),
            "text": newNote
        }
        let url = 'http://localhost:8000/habit/notes'
        await apiRequest('POST', url, noteExample as any)

        setShowNote(false);
        setNoteColor('rgb(34 197 94)')
        setNoteSent(true)
        setNewNote('')
        setTimeout(() => {
            setNoteSent(false)
        }, 5000)
    }

    //style={{ color: getCategoryColor(category) }}
    return (<div key={habit.habitId} className="flex flex-col justify-between">
        <div
            key={habit.habitId}
            className={`${habit.category} p-3 flex flex-row justify-start gap-5 border-t border-gray-800 bg-gray-950 relative`}
        >
            <div className="flex text-sm min-w-[150px] font-white">{habit.name}</div>
            {!hasTasks &&
                <div className="absolute bottom-2 left-[30%]">
                    <div className="text-xs text-gray-500 ml-[70px]">{percentage} %</div>
                    <div className="w-[150px] h-[0.7px] bg-gray-800 z-20" />
                    <div
                        style={{ width: `${percentage * loadingCoeficient}px` }}
                        className={`h-[0.5px] ${comp ? 'bg-green-500' : 'bg-gray-100'} z-0 transition-all duration-500 ease-in-out`}
                    />
                </div>}
            <div className='absolute right-5 flex flex-row mt-1 gap-5'>
                <div className={`${showNote ? 'animate-vibrate' : ''} transition-all duration-500 ease-in-out`}
                    onClick={() => { setShowNote(!showNote) }}>
                    <ScrollTextIcon strokeWidth={0.75} color={noteColor} />
                </div>
                {!hasTasks ? <div className='p-1 bg-gray-900 rounded-2xl' onClick={() => { setExpanded(!expanded) }}>
                    <Maximize2Icon strokeWidth={1.5} size={16} color={mainColor} />
                </div> : <Checkmark condition={comp} check={check} />}
            </div>
        </div>
        <AnimatePresence>
            {expanded && <motion.div
                className="p-5 py-3 bg-gray-950 font-light text-sm relative"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
            >
                {!hasTasks && tasks.map((task) => (
                    <div key={task.id}>
                        <Task
                            task={task}
                            length={tasks.length}
                            setPercentage={setPercentage}
                            percentage={percentage}
                            complete={completeTask}
                        />
                    </div>
                ))}
                <div className="flex flex-row justify-between my-3 ">
                    <div className="flex flex-row justify-center gap-3">
                        <FormTextInput placeholder="Quest subject" label={'New'} type={'text'} setNew={setNewTaskName} />
                    </div>
                    <ConfirmationMini trigger={<PlusCircle color={'#EEFF87'} strokeWidth={0.75} size={25} />} question={'Add quest?'} yesFn={addTask} />
                </div>
            </motion.div>}
        </AnimatePresence>
        {showNote &&
            <div className={`flex flex-row justify-between items-center bg-gray-950 p-2 mb-5`}>
                <label htmlFor="note" className="sr-only">Note</label>
                <input
                    type="text"
                    id="note"
                    className="input flex-grow mr-2"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="What did you achieve?"
                />
                <ConfirmationMini trigger={<ArrowRightIcon color={'#EEFF87'} strokeWidth={0.75} />} question={'Send note?'} yesFn={sendNote} />
            </div>
        }
        {noteSent && <div className="absolute text-xs text-green-300 flex flex-row justify-center animate-slideInAndOut w-[900px]">Note sent</div>}
    </div>
    )
}

export default Habit