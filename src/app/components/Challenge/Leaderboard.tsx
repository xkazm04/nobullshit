'use client';
import { CrownIcon } from "lucide-react";
import { useState } from "react"
import PlayerList from "./PlayerList";
const periods = ['Day', 'Week', 'Month', 'Year']

const players = [
    { username: 'ruchi_0231', score: 8693, img: 'https://placehold.co/64x64.png' },
    { username: 'ayushmn_k', score: 8541, img: 'https://placehold.co/56x56.png' },
    { username: 'jay_goel23', score: 8502, },
    { username: 'ded_boy07', score: 8483 },
    { username: 'shabi_kash', score: 8421 },
    { username: 'call_me_karen', score: 8203 },
]

const Leaderboard = () => {
    const [activePeriods, setActivePeriods] = useState(periods[0])
    const [score, setScore] = useState(3421)
    const topThree = players.slice(0, 3)
    const rest = players.slice(3)

    // Animation from zero to score

    return <div className="text-white">
        <div className="max-w-sm mx-auto py-5">
            <div className="flex justify-between items-center mb-4 px-4">
                <div className="title">Leaderboard</div>
                <div className="text-main text-2xl flex flex-row gap-2 font-bold">
                    <CrownIcon color={'orange'} />
                    <div>{score}</div>
                </div>
            </div>
            <div className="flex justify-around text-center mb-5">
                {periods.map((p, i) =>
                    <button
                        key={i}
                        className={`text-gray-400 font-semibold py-2 px-4 rounded ${activePeriods === p ? 'bg-main text-gray-800' : ''}`}
                        onClick={() => setActivePeriods(p)}>
                        {p}
                    </button>)}
            </div>
            <div className="bg-gray-700 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                    {topThree.map((p, i) =>
                        <div key={i} className="flex flex-col justify-center items-center">
                            <div className="flex flex-row">
                                <div className="text-main text-xl font-bold mr-2"> {i + 1}.</div>
                                <div className="font-bold">{p.score}</div>
                            </div>
                            <div className="ml-3">
                                <p className="text-gray-200 text-sm">{p.username}</p>
                            </div>
                        </div>)}
                </div>
            </div>
            <div className="mt-6 px-4">
                <div className="text-sm font-bold mb-4">
                    Players around you
                </div>
                <PlayerList players={rest} />
            </div>
        </div>
    </div>
}

export default Leaderboard