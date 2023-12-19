'use client';
import { useState } from "react";
const TodoComponent = ({data}) => {
    const [checked, setChecked] = useState(false)
    const [show, setShow] = useState(false)
    
    return <div className="flex flex-col justify-center gap-1 w-full font-mono">
        <div className="p-3 flex flex-row justify-start gap-5 border-t border-gray-600 bg-gray-950 relative w-full">
            <div className="flex flex-row items-center gap-2">
                <div className="text-gray-200">{data.name}</div>
            </div>
        </div>
    </div>
}

export default TodoComponent