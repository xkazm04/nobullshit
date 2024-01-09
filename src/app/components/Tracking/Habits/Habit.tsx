'use client';
import { useState } from "react"
import { Maximize2Icon, PlusCircle, ScrollTextIcon } from "lucide-react";
import { FormTextInput } from "../../form/FormTextInput";
import ConfirmationMini from "../../form/ConfirmationMini";
import { motion, AnimatePresence } from "framer-motion"
import { HabitType } from "@/app/types/TrackerTypes";
import HabitTasks from "./HabitTasks";
import HabitNoteNew from "./HabitNoteNew";
import { getCategoryColor } from "@/app/lib/colorGetter";
import HabitCompletion from "./HabitCompletion";
import ItemDivider from "../../animations/ItemDivider";

const Habit = ({ habit, day }: { habit: HabitType, day: string }) => {

    const [expanded, setExpanded] = useState(false)
    const [showNote, setShowNote] = useState(false)
    const [noteColor, setNoteColor] = useState('#EEFF87' as string)
    const [newTaskName, setNewTaskName] = useState('' as string)
    const [tasksCompleted, setTasksCompleted] = useState(0)
    const [noteSent, setNoteSent] = useState(false)
    const mainColor = '#EEFF87'
    const [error, setError] = useState(false)

    // Fix to date
    const addTask = () => {
        console.log('Task added')
    }

    //
    return (<div key={habit.id} className="flex flex-col justify-between">
        <div
            key={habit.id}
            className={`box-dark relative`}
            style={error ? { border: '2px solid red' } : {borderLeft: `2px solid ${getCategoryColor(habit.category)}`}}
        >
            <div className="flex justify-between text-sm md:text-lg w-full md:px-[5%]" style={{ color: getCategoryColor(habit.category) }}>
                    <div>{habit.name}</div>
                    {habit.volume_actual && <div className="text-xs absolute top-0">{habit.volume_actual} {habit.volume_units}</div>}
                <div className='flex flex-row mt-1 gap-5'>
                    <div className={`${showNote ? 'animate-vibrate' : ''} transition-all duration-500 ease-in-out`}
                        onClick={() => { setShowNote(!showNote) }}>
                        <ScrollTextIcon strokeWidth={0.75} color={noteColor} />
                    </div>
                    <ItemDivider/>
                    {tasksCompleted > 0 ? <div className='p-1 bg-gray-900 rounded-2xl' onClick={() => { setExpanded(!expanded) }}>
                        <Maximize2Icon strokeWidth={1.5} size={16} color={mainColor} />
                    </div> : <HabitCompletion habit={habit} setError={setError} day={day}/>}
                </div>
            </div>

        </div>
        <AnimatePresence>
            {expanded && <motion.div
                className="p-5 py-3 bg-gray-950 font-light text-sm relative"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
            >
               <HabitTasks habitId={habit.id}  />
                <div className="flex flex-row justify-between my-3 ">
                    <div className="flex flex-row justify-center gap-3">
                        <FormTextInput label={'New'} type={'text'} setNew={setNewTaskName} />
                    </div>
                    <ConfirmationMini trigger={<PlusCircle color={'#EEFF87'} strokeWidth={0.75} size={25} />} question={'Add quest?'} yesFn={addTask} />
                </div>
            </motion.div>}
        </AnimatePresence>
        {showNote &&
            <HabitNoteNew habit={habit} setNoteColor={setNoteColor} setNoteSent={setNoteSent} setShowNote={setShowNote} />
        }
        {noteSent && <div className="absolute text-xs text-green-300 flex flex-row justify-center animate-slideInAndOut w-[900px]">Note sent</div>}
    </div>
    )
}

export default Habit