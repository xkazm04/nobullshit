'use client';
import { useState } from "react";
import { Dialog, DialogTrigger } from "../components/ui/dialog";
import Modal from "../components/Modal";
import Leaderboard from "../components/Challenge/Leaderboard";
import ChallengeDetail from "../components/Challenge/ChallengeDetail";
import { ArrowUp } from "lucide-react";
import HeaderComponent from "../components/ui/header";
import ChallengeAiRecommended from "../components/Challenge/ChallengeAiHabits";

const challengeExamples = [
    { id: 1, title: 'Plank', description: '2 min daily', points: 100 },
    { id: 2, title: 'Pushups', description: 'From 30 to 50', points: 200 },
    { id: 3, title: 'Pullups', description: 'From 0 to 10', points: 300 },
    { id: 4, title: 'Squats', description: 'From 50 to 100', points: 400 },
]

const choices = {
    our: 'our',
    own: 'own',
    friend: 'friend'
}
const Page = () => {
    const [showDetail, setShowDetail] = useState(false);
    const [friends, setFriends] = useState([])
    const [activeChoice, setActiveChoice] = useState('our' as string)

    const renderedDialog = (category: any) => {
        return <Modal title='' description="" content={<Leaderboard/>} />
    }

    const startChallenge = () => {
        console.log('startChallenge');
    }
    return <div className="page">
        <div className='absolute z-10 w-full'><HeaderComponent page="Challenge"  /></div>
        <Dialog>
            <div className="flex flex-col mt-[15%] pl-5">
                <div className="flex flex-row justify-start w-full p-5 text-sm font-mono">
                    <div className={`font-semibold py-2 px-4 rounded bg-gray-950 border-r  lg:hover:cursor-pointer
                    ${activeChoice === 'our' ? 'text-main font-bold border-main' : 'text-gray-400'}`}
                       onClick={() => { setActiveChoice(choices.our) }}>
                        Recommended
                    </div>
                    <div className={`font-semibold py-2 px-4 rounded bg-gray-950 border-r  lg:hover:cursor-pointer
                    ${activeChoice === 'own' ? 'text-main font-bold border-main' : 'text-gray-400'}`}
                       onClick={() => { setActiveChoice(choices.own) }}>
                        Your
                    </div>
                    <div className={`font-semibold py-2 px-4 rounded bg-gray-950 border-r lg:hover:cursor-pointer
                    ${activeChoice === 'friend' ? 'text-main font-bold border-main' : 'text-gray-400'}`}
                       onClick={() => { setActiveChoice(choices.friend) }}>
                        Friends
                    </div>
                </div>
                <div className="flex flex-row flex-wrap justify-center">
                    {challengeExamples.map(b => <div key={b.id} className={`flex flex-col items-start gap-1 p-2 w-[160px] m-1 text-sm rounded-xl
                    lg:cursor-pointer lg:hover:bg-gray-900 bg-cc
                `}
                        onClick={() => { setShowDetail(true) }}
                    >
                        <div className="font-mono">{b.title}</div>
                        <div className="font-thin">{b.description}</div>
                    </div>)}
                </div>
                <div className="divider" />
                
                {showDetail && <div className="relative">
                    <div className="absolute right-0" onClick={()=>{setShowDetail(false)}}><ArrowUp/></div>
                    <ChallengeDetail chName='Plank' chDescOne='2 min daily' chDescTwo={'Description two'} startFn={startChallenge} />
                </div>}
            </div>
            {!showDetail && <DialogTrigger>
                <div className="absolute right-0 bottom-[100px]">
                    <div className="btn-action">Open leaderboard</div>
                </div>
            </DialogTrigger>}
           {renderedDialog('health')}
        </Dialog>
        <ChallengeAiRecommended />
    </div>
}

export default Page;