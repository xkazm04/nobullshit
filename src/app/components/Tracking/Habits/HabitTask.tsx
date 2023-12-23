'use client';
import { useState } from 'react'
import { MinusIcon } from "lucide-react"
import { DialogTrigger } from "../../ui/dialog"
import Checkmark from "../../form/Checkmark"

type TaskProps = {
    id: string,
    task: {
        id: string,
        name: string,
        completed: boolean,
    },
    percentage: number,
    setPercentage: any,
    length: number,
    complete: any,
}

const Task = ({task, percentage, setPercentage, length, complete}: TaskProps) => {
    const [striked, setStriked] = useState(false)   
    
    const check = (action: boolean) => {
        if (action === true) {
            console.log('Task completed')
            setPercentage(percentage + 1/length * 100)
            complete(task.id)
            setStriked(true)
        } else {
            console.log('Task uncompleted')
            setPercentage(percentage - 1/length * 100)
            complete(task.id)
            setStriked(false)
        }
    }

    

    return <div key={task.id} className="flex flex-row justify-start gap-5 border-t border-gray-800 bg-gray-950 py-1">
    <div className={`flex flex-col gap-1 py-1 transition-all duration-500 ease-in-out ${striked ? 'line-through text-gray-500' : ''}`}>
        <div>{task.name}</div>
    </div>
    <div className='absolute right-5 flex flex-row mt-2 gap-6'>
        <DialogTrigger asChild>
            <div>{<MinusIcon color={'orange'} />}</div>
        </DialogTrigger>
        <Checkmark condition={striked} check={()=>{check(!striked)}} />
    </div>
</div>
}

export default Task