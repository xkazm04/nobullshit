import { NoteType } from "@/app/types/TrackerTypes";

const Note = (note: NoteType) => {
    return <>
        <div key={note.id} className='italic text-sm'>{note.text}
            <div className='text-xs text-gray-500'>{note.date}</div>
        </div>
    </>
}
export default Note;