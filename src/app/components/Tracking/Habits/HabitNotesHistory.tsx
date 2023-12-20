import { getNotes } from "@/app/apiFns/notesApis";
import Note from "../Note";
import { useQuery } from "@tanstack/react-query";
import { NoteType } from "@/app/types/TrackerTypes";

const HabitNotes = ({habitId}:{habitId:string}) => {
    const {data, error} = useQuery({
        queryKey: ['notes'],
        queryFn: () => getNotes(habitId)
    })

    return <div className=" w-full flex flex-col gap-2 ">
        <div className="title mb-5">Notes history</div>
        <div className='max-h-[400px] overflow-y-hidden border-l-2 border-main px-4 flex flex-col gap-1'>
            {data && data.map((n: NoteType) => (
                <Note key={n.id} {...n} />
            ))}
        </div>
        {error && <div className='alert-error'>Error fetching notes</div>}
        <div className='divider'/>
        <div>Recommendation TBD</div>
    </div>
}

export default HabitNotes;