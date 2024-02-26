import { Trash2Icon } from "lucide-react"

const HabitDelete = ({habitId}: {habitId: any}) => {
    const removeHabit = () => {
        console.log('Habit removed')
    }
    return <>
            <div className='flex flex-col items-center gap-8'>
                <div className="title">You sure?</div>
                <div className="w-10 h-10 md:cursor-pointer"><Trash2Icon strokeWidth={1} color="red"/></div>
            </div>
    </>
}

export default HabitDelete;