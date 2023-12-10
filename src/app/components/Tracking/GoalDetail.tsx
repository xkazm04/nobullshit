// By default calendar component on top - read only
// Notes for each month underneath
// Option to create new note
// Option to setup new goal
'use client';
import { GoalType, NoteType } from "@/app/types/TrackerTypes";
import { useState, useEffect } from "react";
import { noteExamples } from "@/data/examples";
import Note from "./Note";

const GoalDetail = (goal: GoalType) => {
    const [newNote, setNewNote] = useState('')
    const [showNotes, setShowNotes] = useState(false)

    const getNotes = (goal) => {
        console.log('getNotes');
    }

    const createNote = (goal) => {
        console.log('createNote');
    }

    useEffect(() => {
        getNotes(goal);
    }, []);

    return <>
          <div className="full-h min-h-[100%] bg-black">
        <div>
            <form onSubmit={createNote}>
                <textarea
                className="border p-2 bg-slate-950 text-white rounded-lg w-full italic"
                value={newNote}
                onChange={(event) => setNewNote(event.target.value)}
                placeholder='What have I done today..'
                />
                <button className="btn-mini">
                    Add Note
                </button>
            </form>
            <div className='flex flex-col gap-5 my-5 bg-gray-950 p-2 max-h-[250px] overflow-y-auto'>
                {showNotes && noteExamples.length > 0 && noteExamples.map((note: NoteType) => (
                    <Note note={note}/>
                ))}
            </div>
        </div>
      </div>
    </>
}

export default GoalDetail;