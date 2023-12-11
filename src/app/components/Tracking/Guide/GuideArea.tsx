'use client';
import { useState } from "react";

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

const GuideArea = () => {
    const [activeCategory, setActiveCategory] = useState(exampleBoxes[0])
    return  <div>
    <h1>What's your target ?</h1>
    <p>Help us understand your needs better</p>
    <div className="flex flex-row flex-wrap justify-start p-5">
        {exampleBoxes.map(b => <div className={`flex flex-col items-center gap-2 p-2 w-[160px] m-1 text-sm rounded-xl
            lg:cursor-pointer lg:hover:bg-gray-900 ${activeCategory.id === b.id ? 'bg-gray-900 border border-main' : 'bg-transmain'}
        `}
            onClick={() => setActiveCategory(b)}
        >
            <div>{b.name}</div>
        </div>)}
    </div>
</div>
}

export default GuideArea