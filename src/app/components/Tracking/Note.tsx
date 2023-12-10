import { NoteType } from "@/app/types/TrackerTypes";

const Note = (note: NoteType) => {
    return <>
        <div key={note.id} className='italic'>{note.text}
            <div className='text-xs text-gray-500'>{note.date}</div>
        </div>
    </>
}
export default Note;