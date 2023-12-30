import { ArrowRightIcon } from "lucide-react"
import ConfirmationMini from "../../form/ConfirmationMini"
import { useMutation } from "@tanstack/react-query"
import { noteCreate, NoteCreate } from "@/app/apiFns/notesApis"
import { useState } from "react"

type Props = {
    habit: any,
    setNoteColor: any,
    setNoteSent: any,
    setShowNote: any
}

const HabitNoteNew = ({habit, setNoteColor, setNoteSent, setShowNote}: any) => {
    const mainColor = '#EEFF87'
    const [newNote, setNewNote] = useState('' as string)
    const mutation = useMutation({
        mutationFn: (note: NoteCreate) => noteCreate(note),
        onSuccess: () => {
            setShowNote(false);
            setNoteColor('rgb(34 197 94)')
            setNoteSent(true)
            setNewNote('')
            setTimeout(() => {
                setNoteSent(false)
                setNoteColor(mainColor)
            }, 5000)
        },
        onError: () => {
            setNoteColor('rgb(197 34 34)')
        }
    })

    const sendNote = async () => {
        const addedNote = {
            habitId: habit.id || '',
            created: new Date().toISOString(),
            text: newNote,
            ai: false
        }
        mutation.mutate(addedNote)
    }

    return <>
            <div className={`flex flex-row justify-between items-center bg-gray-950 p-2 mb-5`}>
                <label htmlFor="note" className="sr-only">Note</label>
                <input
                    type="text"
                    id="note"
                    className="input flex-grow mr-2"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="What did you achieve?"
                />
                <ConfirmationMini trigger={<ArrowRightIcon color={'#EEFF87'} strokeWidth={0.75} />} question={'Send note?'} yesFn={sendNote} />
            </div>
    </>
}

export default HabitNoteNew