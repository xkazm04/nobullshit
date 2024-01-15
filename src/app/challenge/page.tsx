'use client';
import { useState } from "react";
import { Dialog, DialogTrigger } from "../components/ui/dialog";
import Modal from "../components/Modal";
import Leaderboard from "../components/Challenge/Leaderboard";
import ChallengeDetail from "../components/Challenge/ChallengeDetail";
import { ArrowUp } from "lucide-react";
import HeaderComponent from "../components/ui/header";
import ChallengeAiRecommended from "../components/Challenge/ChallengeAiHabits";
import {AnimatePresence, motion} from 'framer-motion'
import ChallengesDefault from "../components/Challenge/ChallengesDefault";
import Divider from "../components/animations/Divider";

type Props = {
    setActiveChoice: (choice: string) => void,
    choice: string,
    label: string
}

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
    const [activeChoice, setActiveChoice] = useState('our' as string)
    const [detail, setDetail] = useState('' as string) 

    const renderedDialog = (category: any) => {
        return <Modal title='' description="" content={<Leaderboard/>} />
    }

    const MenuItem = ({setActiveChoice, choice, label}:Props) => {
        return <div 
            onClick={() => { setActiveChoice(choice) }}
            className={`menu-item ${activeChoice === choice ? 'text-main' : 'text-gray-400'}`}>
        {label}
        <AnimatePresence>
        {activeChoice === choice && 
        <motion.div 
                initial={{opacity:0, x:-100}}
                animate={{opacity:1, x:0}}
                exit={{opacity:0, x:100}}
                className="absolute bottom-0 left-0 w-full h-[1px] bg-main"/>}
        </AnimatePresence>
        </div>
    }

    const renderSection = (choice: any) => {
        switch (choice) {
            case choices.our:
                return <ChallengesDefault c={challengeExamples} setDetail={setDetail}/>
            case choices.own:
                return <div>Own</div>
            case choices.friend:
                return  <ChallengeAiRecommended />
            default:
                <ChallengesDefault c={challengeExamples} setDetail={setDetail}/>
    }}

    const startChallenge = () => {
        console.log('startChallenge');
    }
    return <div className="page">
        <div className='absolute z-10 w-full'><HeaderComponent page="Challenge"  /></div>
        <Dialog>
            <div className="flex flex-col mt-[10%] p-2 w-full">
                <div className="flex flex-row justify-start w-full">
                     <MenuItem setActiveChoice={setActiveChoice} choice={choices.our} label='Best practices'/>
                    <MenuItem setActiveChoice={setActiveChoice} choice={choices.own} label='Yours'/>
                    <MenuItem setActiveChoice={setActiveChoice} choice={choices.friend} label='AI recommended'/>
                </div>
                <div className="mt-[10%]">
                    {renderSection(activeChoice)}
                </div>
                {showDetail && <div className="relative">
                    <Divider/>
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
    </div>
}

export default Page;