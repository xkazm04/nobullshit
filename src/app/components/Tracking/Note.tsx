'use client'
import { NoteType } from "@/app/types/TrackerTypes";
import { GoalIcon, MessageSquare, MinusIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { deleteNote } from "@/app/apiFns/notesApis";
import ConfirmationMini from "../form/ConfirmationMini";
import { useState } from "react";

const Note = (note: NoteType) => {
    const [error, setError] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const removeNote = (id: string) => {
        mutation.mutate(id)
    }

    const mutation = useMutation({
        mutationFn: (id: string) => deleteNote(id),
        onSuccess: () => {
            setDeleted(true)
        },
        onError: () => {
            setError(true)
        }
    })
    
    return <>
        <div key={note.id} className='italic text-sm flex flex-row justify-between w-full'>
            {!deleted ? <div>
           <div className="flex gap-2">     
                    {note.type === 'task' ? <div className='text-green-300'><GoalIcon size={12}/></div> : <div className='text-yellow-300'><MessageSquare size={12}/></div>}
                    <div>{note.text}</div>
                </div>
                <div className='text-xs text-gray-500'>{note.date}</div>
            </div> : <div className='text-gray-500'>Note deleted</div>}
            {!deleted && <div>
                {error ? <div className='alert-error'>Deletion failed</div> : 
                <ConfirmationMini trigger={<MinusIcon color={'#EEFF87'} strokeWidth={0.75} size={25} />} question={'Delete note?'}  yesFn={()=>{removeNote(note.id)}} />}
            </div>}
        </div>
    </>
}
export default Note;