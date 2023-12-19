'use client'

import TrackerNew from "../components/Tracking/TrackerNew"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import BottomNav from "../components/BottomNav"
import { useState } from "react"
import GoalNew from "../components/Tracking/Habits/HabitNew"
import GoalGuide from "../components/Tracking/Guide/GoalGuide"

const menuOptions = [
    { id: 'tracker', name: 'Tracker' },
    { id: 'goal', name: 'Goal' },
    { id: 'guide', name: 'Guide'}
]

const Page = () => {
    const [menu, setMenu] = useState('tracker')
    let flow = 'create'
    const router = useRouter()
    const goBack = () => {
        router.back()
    }

    const renderComponent = () => {
        switch (menu) {
            case 'tracker':
                return <TrackerNew flow={flow}/>
            case 'goal':
                return <GoalNew/>
            case 'guide':
                return <GoalGuide/>
        } 
    }

    return <div className="flex flex-col h-full">
        <div className="flex flex-row justify-between p-7"><button onClick={goBack}><ArrowLeft color="#EEFF87"/></button></div>
        <div className="flex flex-row  mb-8">
            {menuOptions.map(m => <div key={m.id} className="justify-center p-1">
                <div 
                    className={`btn-mini ${menu === m.id ? 'bg-main text-gray-900' : 'bg-gray-900 text-gray-300'}`}
                    onClick={() => setMenu(m.id)}
                >
                    {m.name}
                </div>
            </div>)}
        </div>
            {renderComponent()}
        <BottomNav/>
    </div>
}

export default Page