'use client';
import { useState } from "react"
import { ArrowRightIcon, Maximize2Icon, PlusCircle, ScrollTextIcon } from "lucide-react";
import Checkmark from "../../form/Checkmark";
import { FormTextInput } from "../../form/FormTextInput";
import ConfirmationMini from "../../form/ConfirmationMini";
import { motion, AnimatePresence } from "framer-motion"
import { HabitType } from "@/app/types/TrackerTypes";
import { useMutation } from "@tanstack/react-query";
import { noteCreate, NoteCreate } from "@/app/apiFns/notesApis";
import HabitTasks from "./HabitTasks";


// Task On complete remove + return back 
// + Create note
// note -> Text, Date, Boolean

const Habit = ({ habit }: { habit: HabitType }) => {
    const [comp, setComp] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [showNote, setShowNote] = useState(false)
    const [newNote, setNewNote] = useState('' as string)
    const [noteColor, setNoteColor] = useState('#EEFF87' as string)
    const [newTaskName, setNewTaskName] = useState('' as string)

    const [percentage, setPercentage] = useState(0)
    const [tasksCompleted, setTasksCompleted] = useState(0)
    const [noteSent, setNoteSent] = useState(false)
    const mainColor = '#EEFF87'
    // If note active, stronger stroke width of the icon 

    const mutation = useMutation({
        mutationFn: (note: NoteCreate) => noteCreate(note),
        onSuccess: () => {
            setShowNote(false);
            setNoteColor('rgb(34 197 94)')
            setNoteSent(true)
            setNewNote('')
            setTimeout(() => {
                setNoteSent(false)
            }, 5000)
        },
        onError: () => {
            setNoteColor('rgb(197 34 34)')
        }
    })
    
    const check = (action: boolean) => {
        if (action === true) {
            setComp(true)
        } else {
            setComp(false)
        }
    }


    const removeGoal = () => {
        console.log('Goal removed')
    }

    const addTask = () => {
        console.log('Task added')
    }


    const sendNote = async () => {
        const addedNote = {
            "habitId": habit.id,
            "created": new Date().toISOString(),
            "text": newNote,
            "ai": false
        }
        mutation.mutate(addedNote)
    }

    //style={{ color: getCategoryColor(category) }}
    return (<div key={habit.id} className="flex flex-col justify-between">
        <div
            key={habit.id}
            className={`${habit.category} p-3 flex flex-row justify-start gap-5 border-t border-gray-400 bg-gray-950/20 relative`}
        >
            <div className="flex text-sm min-w-[150px] font-white">{habit.name}</div>
            <div className='absolute right-5 flex flex-row mt-1 gap-5'>
                <div className={`${showNote ? 'animate-vibrate' : ''} transition-all duration-500 ease-in-out`}
                    onClick={() => { setShowNote(!showNote) }}>
                    <ScrollTextIcon strokeWidth={0.75} color={noteColor} />
                </div>
                {tasksCompleted > 0 ? <div className='p-1 bg-gray-900 rounded-2xl' onClick={() => { setExpanded(!expanded) }}>
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
               <HabitTasks habitId={habit.id} />
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