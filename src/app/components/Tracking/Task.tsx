import { MinusIcon } from "lucide-react"
import { DialogTrigger } from "../ui/dialog"
import Checkmark from "../form/Checkmark"

const Task = ({task, percentage, setPercentage, length, complete}) => {
    const check = (action: boolean) => {
        if (action === true) {
            console.log('Task completed')
            setPercentage(percentage + 1/length * 100)
            complete(task.id)
        } else {
            console.log('Task uncompleted')
            setPercentage(percentage - 1/length * 100)
            complete(task.id)
        }
    }
    return <div className="flex flex-row justify-start gap-5 border-t border-gray-800 bg-gray-950 py-1">
    <div className='flex flex-col gap-1 py-1'>
        <div>{task.name}</div>
    </div>
    <div className='absolute right-5 flex flex-row mt-2 gap-6'>
        <DialogTrigger asChild>
            <div>{<MinusIcon color={'orange'} />}</div>
        </DialogTrigger>
        <Checkmark condition={task.completed} check={check} />
    </div>
</div>
}

export default Task