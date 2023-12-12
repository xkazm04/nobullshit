'use client';
import { useState } from "react"
import { ArrowRightIcon, Maximize2Icon, MinusIcon, ScrollTextIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import Modal from "../Modal";
import ConfirmationDialog from "../form/ConfirmationDialog";
import Checkmark from "../form/Checkmark";

export type GoalType = {
    id: number,
    name: string,
    category: string,
    completed: boolean,
}

const tasks = [
    { id: 1, name: 'Task 1', completed: true },
    { id: 2, name: 'Task 2', completed: false },
]


const Goal = ({ id, name, category, completed }: GoalType) => {
    const [comp, setComp] = useState(completed)
    const [expanded, setExpanded] = useState(false)
    const [showNote, setShowNote] = useState(false)
    const [newNote, setNewNote] = useState('' as string)
    const [noteColor, setNoteColor] = useState('#EEFF87' as string)
    const loadingCoeficient = 2
    const hasTasks = tasks.length > 0
    const [percentage, setPercentage] = useState(50)
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

    const sendNote = () => {
        console.log('Note sent')
        setShowNote(false);
        setNoteColor('rgb(34 197 94)')
    }

    const renderDialog = () => {
        return <>
            <Modal title={'Goal removal'} description={''} content={<ConfirmationDialog yesFn={removeGoal} />} />
        </>
    }
//style={{ color: getCategoryColor(category) }}
    return (
        <div className="flex flex-col justify-between">
            <Dialog>
            <div
                key={id}
                className={`${category} p-3 flex flex-row justify-start gap-5 border-t border-gray-800 bg-gray-950 relative`}
            >
                <div className="flex text-sm min-w-[150px] font-white">{name}</div>
                <div className="absolute bottom-2 left-[20%]">
                    <div className="w-[200px] h-[0.7px] bg-gray-600"/>
                    <div className={`h-[0.5px] bg-gray-400 w-[${percentage * loadingCoeficient}px] ${comp} ? 'bg-green-500' : 'bg-main'}`}/>
                </div>
                <div className='absolute right-5 flex flex-row mt-1 gap-5'>
                    <div onClick={() => { setShowNote(!showNote) }}>
                        <ScrollTextIcon strokeWidth={0.75} color={noteColor} />
                    </div>
                    {hasTasks ? <div className='p-1 bg-gray-900 rounded-2xl' onClick={() => { setExpanded(!expanded) }}>
                        <Maximize2Icon strokeWidth={1.5} size={16} color={noteColor} />
                    </div> : <Checkmark condition={comp} check={check} />}
                </div>
            </div>
            {expanded && <div className="p-5 py-3 bg-gray-950 font-light text-sm">
                {tasks.map((task) => (
                    <div className="flex flex-row justify-start gap-5 border-t border-gray-800 bg-gray-950 py-1">
                        <div className='flex flex-col gap-1 py-1'>
                            <div>{task.name}</div>
                        </div>
                        <div className='absolute right-5 flex flex-row mt-2 gap-6'>
                            <DialogTrigger asChild>
                                <div>{<MinusIcon color={'orange'} />}</div>
                            </DialogTrigger>
                            <Checkmark condition={task.completed} check={check} />
                        </div>
                    </div>
                ))}
            </div>}
            {showNote &&
                <div className="flex flex-row justify-between items-center bg-gray-950 p-2 mb-5">
                    <label htmlFor="note" className="sr-only">Note</label>
                    <textarea
                        id="note"
                        className="input flex-grow mr-2"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Write a note"
                    />
                    <button className="btn-mini" onClick={sendNote}>
                        <ArrowRightIcon color={'#EEFF87'} strokeWidth={0.75} />
                    </button>
                </div>
            }
            {renderDialog()}
            </Dialog>
        </div>
    )
}

export default Goal