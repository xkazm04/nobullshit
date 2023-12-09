'use client';
import { MenuIcon } from "../icons/IconsNav"
import { useState } from "react"

export type GoalType = {
    id: number,
    name: string,
    category: string,
    completed: boolean, 
}


const Goal = ({id, name, category, completed}:GoalType) => {
    const [comp, setComp] = useState(completed)
    const [expanded, setExpanded] = useState(false)
    const check = (action: boolean) => {
        if (action === true){
            setComp(true)
        } else {
            setComp(false) 
        }
    }
    return (
        <div className="flex flex-col justify-between">
        <div 
            key={id} 
            className={`${category} p-2 flex flex-row justify-start gap-5 border-t border-gray-800 bg-gray-950`}
            onClick={() => { setExpanded(!expanded) }}
        >
            <div className='mt-2 px-1'>
                <MenuIcon />
            </div>
            <div className='flex flex-col gap-1 py-1'>
                <div>{name}</div>
            </div>
            <div className='absolute right-5'>
                {comp ? (
                    <div className="text-green-500 bg-green-950 rounded-xl mt-2 lg:hover:text-green-700 lg:cursor-pointer"
                        onClick={() => { check(false) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                ) : (
                    <div className="text-red-500 bg-red-950 rounded-xl mt-2 lg:hover:text-red-700 lg:cursor-pointer"
                        onClick={() => { check(true) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                )}
            </div>
        </div>
        {expanded && <div className="p-5 py-3 bg-gray-950 font-light text-sm"
            onClick={() => { setExpanded(!expanded) }}>Expanded</div>}
      </div>
    )
}

export default Goal