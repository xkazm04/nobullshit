import { getNotes } from "@/app/apiFns/notesApis";
import Note from "../Note";
import { useQuery } from "@tanstack/react-query";
import { NoteType } from "@/app/types/TrackerTypes";


const HabitNotesHistory = ({habitId}:{habitId:string}) => {
    const {data, error} = useQuery({
        queryKey: ['notes', habitId],
        queryFn: () => getNotes(habitId)
    })

    // Mobile test and scroll
    // Connect with real data
    // Create new api for notes and tasks together

    return <div className=" w-full flex flex-col gap-2 ">
        <div className="title mb-5">Habit log</div>
        <div className='max-h-[200px] overflow-y-auto border-l border-yellow-200/10 px-4 flex flex-col gap-1'>
            {data && data.map((n: NoteType) => (
                <Note key={n.id} {...n} />
            ))}
        </div>
        {error && <div className='alert-error'>Something went wrong...</div>}
        <div className='divider'/>
        <div>Recommendation module TBD</div>
    </div>
}

export default HabitNotesHistory;