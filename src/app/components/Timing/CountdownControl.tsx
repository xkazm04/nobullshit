import { PauseCircleIcon, PlayCircleIcon, Trash2Icon } from 'lucide-react';

type Props = {
    active: boolean,
    isRunning: boolean,
    startTimer: () => void,
    resumeTimer: () => void,
    stopTimer: () => void,
    resetTimer: () => void
}

const CountdownControl = ({ active, isRunning, startTimer, resumeTimer, stopTimer, resetTimer }: Props) => {
    return <>
    <div className='typo-label'>Control panel</div>
        <div className='box-dark'>
            <div>
                {!active && <button onClick={startTimer}><PlayCircleIcon strokeWidth={1} size={30} color={'#86efac'} /></button>}
                {!isRunning && active && <button onClick={resumeTimer}><PlayCircleIcon strokeWidth={1} size={30} color={'#86efac'} /></button>}
                {isRunning &&
                    <button
                        className='animate-fadeIn transition-all duration-500 ease-in-out'
                        onClick={stopTimer}><PauseCircleIcon strokeWidth={1} size={30} color={'#fde047'} /></button>}
            </div>
            {!isRunning && active && <div><button onClick={resetTimer}><Trash2Icon strokeWidth={1} size={30} color={'#fb7185'} /></button></div>}
        </div>
        </>
}

export default CountdownControl;