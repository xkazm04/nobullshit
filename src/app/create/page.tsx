'use client'

import TrackerNew from "../components/Tracking/TrackerNew"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import BottomNav from "../components/BottomNav"
import { useState } from "react"
import GoalNew from "../components/Tracking/GoalNew"

const menuOptions = [
    { id: 'tracker', name: 'Tracker' },
    { id: 'goal', name: 'Goal' },
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
        } 
    }

    return <div className="flex flex-col h-full">
        <button onClick={goBack}><ArrowLeft color="red"/></button>
        <div className="flex flex-row">
            {menuOptions.map(m => <div className="flex flex-row justify-center">
                <div className={`btn-mini
                    ${menu === m.id ? 'bg-main text-gray-900' : 'bg-gray-900 text-gray-300'}`}
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