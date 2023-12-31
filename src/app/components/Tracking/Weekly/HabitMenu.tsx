'use client';
import { AxeIcon, ListIcon, PenIcon, Trash2Icon } from "lucide-react";
import { NoBullshitLogo } from "../../icons/illustrations";
import { useState } from "react";
import HabitNotesHistory from "./HabitNotesHistory";
import HabitDelete from "../Habits/HabitDelete";

const settingsItems = [
    {
        name: 'Edit',
        icon: <PenIcon/>
    }, {
        name: 'Stats',
        icon: <AxeIcon/>
    }, {
        name: 'Notes',
        icon: <ListIcon />
    },  {
        name: 'Delete',
        icon: <Trash2Icon/>
    },

]

const HabitMenu = ({ habitId }: {habitId:string}) => {
    const [active, setActive] = useState('Notes')
    return <>
        <div className='absolute right-0'><NoBullshitLogo color={'rgba(238, 255, 135, 0.15)'} /></div>
        <div className='divider' />
        <div className="flex flex-row justify-between">
            <div className={`flex flex-col items-start gap-5 justify-start h-full text-sm py-1 px-2 font-mono rounded-xl transition-all duration-200 ease-out  tracking-wide`}>
                {settingsItems.map((item) => (
                    <div 
                        key={item.name}
                        className='flex flex-row items-center justify-between w-full'
                        onClick={() => setActive(item.name)}
                    >
<                   div className={`flex flex-row lg:cursor-pointer items-center gap-2 ${active === item.name ? 'text-green-300' : ''}`}>
                            <div>{item.icon}</div>
                            <div>{item.name}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="full-w min-w-[70%]">
                {active === 'Notes' && <HabitNotesHistory habitId={habitId} />}
                {active === 'Edit' && <>Edit</>}
                {active === 'Stats' && <>Stats</>}
                {active === 'Delete' && <HabitDelete habitId={habitId}/>}
            </div>
        </div>

    </>
}

export default HabitMenu;