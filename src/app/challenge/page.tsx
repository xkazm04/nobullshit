'use client';
import { useState } from "react";
import BottomNav from "../components/BottomNav";
import Header from "../components/Header";

const challengeExamples = [
    {id:1, title: 'Plank', description: '2 min daily'},
    {id:2, title: 'Pushups', description: 'From 30 to 50'},
    {id:3, title: 'Pullups', description: 'From 0 to 10'},
    {id:4, title: 'Squats', description: 'From 50 to 100'},
]

const Page = () => {
    const [showDetail, swtShowDetail] = useState(false);
    const [friends, setFriends] = useState([])
    return <div className="page">
        <div className='absolute z-10 w-full'><Header /></div>  
        <div className="flex flex-col mt-[15%] pl-5">
            <div className="flex flex-row justify-between p-5 text-sm font-mono">
                <div className="cat-row p-2 rounded-xl bg-gray-950">Choose our challenge</div>
                <div>or</div>
                <div className="cat-row p-2 rounded-xl bg-gray-950">Create your own</div>
            </div>
            <div className="flex flex-row flex-wrap justify-center">
                {challengeExamples.map(b => <div className={`flex flex-col items-start gap-1 p-2 w-[160px] m-1 text-sm rounded-xl
                    lg:cursor-pointer lg:hover:bg-gray-900 bg-cc
                `}
                onClick={()=>{swtShowDetail(true)}}
                >
                    <div className="font-mono">{b.title}</div>
                    <div className="font-thin">{b.description}</div>
                </div>)}
            </div>
            <div className="divider" />
            {showDetail &&<> 
            <div className="cat-row p-5">Challenge description</div>
            <div className="flex flex-col items-start gap-1 p-5">
                <div className="font-thin">Plank is a great exercise for your core. It helps you to build your core muscles and improve your posture.</div>
                <div className="font-thin">You can start with 30 seconds and increase the time by 10 seconds every day.</div>
            </div>
                <div className="divider" />
                <div className="flex flex-col h-full w-full gap-10">
                    <div className="font-thin">Number of users applied / completed </div>
                    {friends && friends.length > 0 && <>
                        <div>Invite your friends</div>
                    </>}
                    <div><button className="btn-mini w-full">Start challenge</button></div>
                </div>
            </>}
        </div>
        <div className='z-10 w-full'><BottomNav /></div>
    </div>
}

export default Page;