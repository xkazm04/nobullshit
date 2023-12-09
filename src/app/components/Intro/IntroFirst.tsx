import { categories } from "@/data/enums"
import { useState } from "react"

const IntroFirst = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0])
    const [habitName, setHabitName] = useState('')
    const [habitDays, setHabitDays] = useState([false, false, false, false, false, false, false])
    
    return (
        <div className="flex flex-col items-center justify-start w-full h-full py-10">
            <div className="w-full p-5">
                <div className="text-main font-semibold flex flex-row justify-center my-8">Select category</div>
                <div className="divider"/>
                <div className="flex flex-row flex-wrap">
                    {categories.map(c => <div id={c.id}>
                        <div className="bg-gray-950 text-gray-300 py-2 px-5 rounded-2xl border border-transmain my-1  
                        lg:hover:bg-gray-900 lg:cursor-pointer"
                         onClick={() => setActiveCategory(c)}
                        >
                            <div className={`w-3 h-3 rounded-full inline-block mr-2 ${activeCategory.id === c.id ? 'bg-main' : 'bg-gray-900'}`}/> 
                            {c.name}
                        </div>
                    </div>)}
                </div>
                <div className="text-main font-semibold flex flex-row justify-center my-8">Habit name</div>
                <div className="divider"/>
                <label htmlFor="habitName" className="sr-only">Habit Name</label>
                <input 
                    className="fullbox lg:hover:cursor-pointer " 
                    type="text" 
                    placeholder="Daily pushups" 
                    onChange={e => setHabitName(e.target.value)}
                    autoComplete="off"
                />
                <div className="text-main font-semibold flex flex-row justify-center my-8">Days to follow</div>
                <div className="divider"/>
                <div className="flex flex-row justify-center gap-5">
                    {habitDays.map((d, i) => <div className="flex flex-col items-center gap-2 lg:cursor-pointer">
                        <div className="text-gray-300">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</div>
                        <div className={`w-8 h-8 rounded-full flex flex-col justify-center items-center lg:hover:bg-transmain
                        ${d ? 'bg-main text-gray-900' : 'bg-gray-900 text-gray-300'}`}
                        onClick={() => setHabitDays(habitDays.map((d, j) => i === j ? !d : d))}
                        >
                            {i + 1}
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default IntroFirst