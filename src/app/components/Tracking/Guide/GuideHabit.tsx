'use client';
import { useState } from "react";
import { Input } from "../../ui/input";

const exampleBoxes = [
    {id: 1, name: 'Live healthy', color: 'bg-green-500'},
    {id: 2, name: 'Lose weight', color: 'bg-yellow-500'},
    {id: 3, name: 'Gain weight', color: 'bg-red-500'},
    {id: 4, name: 'Build muscle', color: 'bg-blue-500'},
    {id: 5, name: 'Improve endurance', color: 'bg-purple-500'},
    {id: 6, name: 'Improve flexibility', color: 'bg-pink-500'},
    {id: 7, name: 'Improve posture', color: 'bg-gray-500'},
    {id: 8, name: 'Improve balance', color: 'bg-gray-500'},
]

const GuideHabit = () => {
    const [activeHabit, setActiveHabit] = useState(exampleBoxes[0])
    const [customHabit, setCustomHabit] = useState('')
    // Merge active and custom habits
    return  <div>
    <p>Choose your habit you would like to focus on</p>
    <div className="flex flex-row flex-wrap justify-start p-5">
        {exampleBoxes.map(b => <div key={b.id} className={`flex flex-col items-center gap-2 p-2 w-[160px] m-1 text-sm rounded-xl
            md:cursor-pointer md:hover:bg-gray-900 ${activeHabit.id === b.id ? 'bg-gray-900 border border-main' : 'bg-transmain'}
        `}
            onClick={() => setActiveHabit(b)}
        >
            <div>{b.name}</div>
        </div>)}
    </div>
    <div className="divider"/>
    <div className="flex flex-row flex-wrap justify-start p-5">
        Or type your own
        <Input placeholder="Daily pushups" onChange={e => setCustomHabit(e.target.value)} />
    </div>
</div>
}

export default GuideHabit