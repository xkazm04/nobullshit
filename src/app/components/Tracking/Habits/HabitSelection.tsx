import HabitNew from "./HabitNew";
import { useState } from "react";
import HabitTemplate from "./HabitTemplate";

const HabitSelection = () => {
    const [custom, setCustom] = useState(true)
    return <div className="flex flex-col justify-start w-full">
            <div className="flex flex-row justify-start gap-3 font-mono text-main text-sm"> 
            <div className={`${custom ? ' ' : 'bg-blue-950/50'} px-3 py-1 rounded-2xl transition-all duration-300 md:cursor-pointer`}  
                onClick={() => setCustom(false)}
            >Templates</div>
                        <div className={`${!custom ? ' ' : 'bg-blue-950/50'} px-3 py-1 rounded-2xl transition-all duration-300 md:cursor-pointer`}  
                onClick={() => setCustom(true)}
            >My very own</div>
        </div>
        {custom ? <HabitNew/> : <HabitTemplate/>}
    </div>
}

export default HabitSelection;