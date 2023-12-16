import Note from "../Note";

const HabitNotes = ({notes}) => {
    return <div className=" w-full flex flex-col gap-2 ">
        <div className="title mb-5">Notes history</div>
        <div className='max-h-[400px] overflow-y-hidden border-l-2 border-main px-4 flex flex-col gap-1'>
            {notes.map((note) => (
                <Note key={note.id} {...note} />
            ))}
        </div>
        <div className='divider'/>
        <div>Recommendation TBD</div>
    </div>
}

export default HabitNotes;