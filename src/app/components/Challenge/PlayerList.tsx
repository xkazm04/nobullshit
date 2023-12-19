interface Player {
    username: string;
    score: number;
}

interface PlayerListProps {
    players: Player[];
}

const PlayerList = ({players}:PlayerListProps) => {
    return <>
        <div>
            {players && players.map((p: Player, i: number) =>
                <div key={i} className="flex justify-between items-center py-2 border-b border-transmain">
                    <div className="flex items-center">
                        <p className="text-main text-xl font-bold mr-2"> {i + 4}</p>
                        <div className="flex items-center">
                            <div className="ml-3 text-sm">{p.username}</div>
                        </div>
                    </div>
                    <div className="text-sm">{p.score}</div>
                </div>)}
        </div>
    </>
}
export default PlayerList