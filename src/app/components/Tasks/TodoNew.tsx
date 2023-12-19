'use client';
import { BanIcon, EarIcon, Link2Icon, PlusCircleIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
const TodoNew = () => {
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const s = () => {
        setShow(!show)
    }

    const recommend = () => {
        setLoading(true)
    }

    const Form = () => {
        return <div 
            className="asbolute bottom-[10%] left-0 w-full min-h-[200px] z-10 flex flex-col items-center justify-center bg-black bg-opacity-50
                animate-fadeIn transition-all duration-500 gap-5">
            <div className="flex flex-row justify-center relative gap-1">
                <div><input className="input" placeholder="Enter a name" /></div>
                <div><button className="btn-action"><Link2Icon size={18}/></button></div>
                <div className="absolute text-xs right-0 top-[-25px] italic font-mono">habit not selected</div>
            </div>
            <div className="flex flex-row justify-between gap-5">
                <button className="btn-action" onClick={()=>{recommend()}}><EarIcon/></button>
                <button className="btn-action" onClick={s}><BanIcon/></button>
                <button className="btn-action" onClick={s}><PlusIcon/></button>
            </div>
        </div>
    }

    return (
        <div className="flex flex-row justify-end">
             {!show && <button className="absolute btn-action z-20 bottom-[10%]" onClick={s}><PlusCircleIcon /></button>}
                {show && <Form key="newTodoForm" />}
        </div>
    );
}

export default TodoNew