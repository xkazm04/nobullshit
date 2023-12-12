const ChallengeDetail = ({chName,chDescOne, chDescTwo, startFn}) => {
    return  <>              
    <div className="cat-row p-5">{chName}</div>
    <div className="flex flex-col items-start gap-1 p-5 text-sm">
        <div className="font-thin">{chDescOne}</div>
        <div className="font-thin">{chDescTwo}</div>
    </div>
    <div className="divider" />
    <div className="flex flex-col h-full w-full gap-10">
        <div>
            <button className="btn-action w-full" onClick={startFn}>Start challenge</button>
        </div>
    </div>
    </>
}

export default ChallengeDetail;