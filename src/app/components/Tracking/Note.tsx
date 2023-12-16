import { NoteType } from "@/app/types/TrackerTypes";
import { MinusIcon } from "lucide-react";

const Note = (note: NoteType) => {
    return <>
        <div key={note.id} className='italic text-sm flex flex-row justify-between'>
            <div>
                {note.text}
                <div className='text-xs text-gray-500'>{note.date}</div>
            </div>
            <div>
                <MinusIcon strokeWidth={1} color="red"/>
            </div>
        </div>
    </>
}
export default Note;