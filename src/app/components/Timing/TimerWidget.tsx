import { useEffect, useState } from 'react';

const TimerWidget = () => {
    const [countdown, setCountdown] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [active, setActive] = useState(false);
    useEffect(() => {
        // Load the timer state from localStorage when the component mounts
        const timerState = JSON.parse(localStorage.getItem('timerState'));
        console.log(timerState)
        if (timerState) {
          setCountdown(timerState.countdown);
          setIsRunning(timerState.isRunning);
          setActive(timerState.active);
        }
      }, []);

    return <> 
    {active &&
        <div className="absolute bg-black border border-gray-900 rounded-2xl right-5 top-5 px-3">
            {isRunning ? <div className="text-white text-xs font-bold">{countdown}</div> : <div className="text-white text-4xl font-bold">00:00:00</div>}
        </div>}
    </>
}

export default TimerWidget

