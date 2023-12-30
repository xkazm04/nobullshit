import { getNotes } from "@/app/apiFns/notesApis";
import Note from "../Note";
import { useQuery } from "@tanstack/react-query";
import { NoteType } from "@/app/types/TrackerTypes";

const notesExamples = [{
    id: 1,
    text: 'I woke up at 6:00 am',
    date: '2021-08-29',
    type: 'note'
}, {
    id: 2,
    text: 'I woke up at 6:00 am',
    date: '2021-08-28',
    type: 'note'
}, {
    id: 3,
    text: 'I woke up at 6:00 am',
    date: '2021-08-27', 
    type: 'task'
}, {
    id: 4,
    text: 'I woke up at 6:00 am',
    date: '2021-08-26',
    type: 'task'
}, {
    id: 5,
    text: 'I woke up at 6:00 am',
    date: '2021-08-25',
    type: 'task'
}, {
    id: 6,
    text: 'I woke up at 6:00 am',
    date: '2021-08-29',
    type: 'note'
}, {
    id: 7,
    text: 'I woke up at 6:00 am',
    date: '2021-08-28',
    type: 'note'
}, {
    id: 8,
    text: 'I woke up at 6:00 am',
    date: '2021-08-27', 
    type: 'task'
}, {
    id: 9,
    text: 'I woke up at 6:00 am',
    date: '2021-08-26',
    type: 'task'
}, {
    id: 10,
    text: 'I woke up at 6:00 am',
    date: '2021-08-25',
    type: 'task'
}, ]

const HabitNotes = ({habitId}:{habitId:string}) => {
    const {data, error} = useQuery({
        queryKey: ['notes'],
        queryFn: () => getNotes(habitId)
    })

    // Mobile test and scroll
    // Connect with real data
    // Create new api for notes and tasks together

    return <div className=" w-full flex flex-col gap-2 ">
        <div className="title mb-5">Habit log</div>
        <div className='max-h-[200px] overflow-y-auto border-l border-yellow-200/10 px-4 flex flex-col gap-1'>
            {notesExamples && notesExamples.map((n: NoteType) => (
                <Note key={n.id} {...n} />
            ))}
        </div>
        {error && <div className='alert-error'>Error fetching notes</div>}
        <div className='divider'/>
        <div>Recommendation TBD</div>
    </div>
}

export default HabitNotes;