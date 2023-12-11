'use client';
import { MenuIcon } from "../icons/IconsNav"
import { useState } from "react"
import { ArrowRightCircleIcon, ScrollTextIcon } from "lucide-react";

export type GoalType = {
    id: number,
    name: string,
    category: string,
    completed: boolean, 
}

const tasks = [
    { id: 1, name: 'Task 1', completed: true },
    { id: 2, name: 'Task 2',  completed: false },
]


const Goal = ({id, name, category, completed}:GoalType) => {
    const [comp, setComp] = useState(completed)
    const [expanded, setExpanded] = useState(false)
    const [showNote, setShowNote] = useState(false)
    const [newNote, setNewNote] = useState('' as string)
    const [noteColor, setNoteColor] = useState('#EEFF87' as string)
    const check = (action: boolean) => {
        if (action === true){
            setComp(true)
        } else {
            setComp(false) 
        }
    }

    const sendNote = () => {
        console.log('Note sent')
        setShowNote(false);
        setNoteColor('rgb(34 197 94)')
    }

    return (
        <div className="flex flex-col justify-between">
        <div 
            key={id} 
            className={`${category} p-2 flex flex-row justify-start gap-5 border-t border-gray-800 bg-gray-950`}
        >
            <div className='p-2 bg-transmain' onClick={() => { setExpanded(!expanded) }}
            >
                <MenuIcon />
            </div>
            <div className='flex flex-col gap-1 py-1'>
                <div>{name}</div>
            </div>
            <div className='absolute right-5 flex flex-row mt-1 gap-5'>
                <div
                    onClick={() => { setShowNote(!showNote) }}
                ><ScrollTextIcon strokeWidth={0.75} color={noteColor}/></div>
                {comp ? (
                    <div className="text-green-500 bg-green-950 rounded-xl  lg:hover:text-green-700 lg:cursor-pointer"
                        onClick={() => { check(false) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                ) : (
                    <div className="text-red-500 bg-red-950 rounded-xl lg:hover:text-red-700 lg:cursor-pointer"
                        onClick={() => { check(true) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                )}
            </div>
        </div>
        {expanded && <div className="p-5 py-3 bg-gray-950 font-light text-sm">
                    {tasks.map((task) => (
                        <div className="flex flex-row justify-start gap-5 border-t border-gray-800 bg-gray-950 py-1">
                            <div className='flex flex-col gap-1 py-1'>
                                <div>{task.name}</div>
                            </div>
                            <div className='absolute right-5'>
                                {task.completed ? (
                                    <div className="text-green-500 bg-green-950 rounded-xl mt-2 lg:hover:text-green-700 lg:cursor-pointer"
                                        onClick={() => { check(false) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                ) : (
                                    <div className="text-red-500 bg-red-950 rounded-xl mt-2 lg:hover:text-red-700 lg:cursor-pointer"
                                        onClick={() => { check(true) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
            </div>}
            {showNote && <div className="flex flex-col justify-between mb-5">
                    <div className="flex flex-row justify-between w-full">
                        <div>
                            <label htmlFor="note" className="sr-only">Note</label>
                            <textarea
                                id="note"
                                className="input w-full min-w-[300px]"
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                placeholder="Write a note"
                            />
                        </div>
                        <div>
                            <button className="btn-mini w-full" onClick={sendNote}><ArrowRightCircleIcon color={'#EEFF87'} strokeWidth={0.75}/></button>
                        </div>
                    </div>
                </div>
                }
      </div>
    )
}

export default Goal