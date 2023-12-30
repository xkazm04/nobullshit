import {useRive, useStateMachineInput } from '@rive-app/react-canvas-lite'

const Bell = () => {
    const {rive, RiveComponent, loaded} = useRive({
        src: '/assets/anim/bell.riv',
        stateMachines: 'State Machine 1',
        autoplay: false,
    })

    const input = useStateMachineInput(rive, 'State Machine 1', 'Timeline 1');

    const playAnimation = () => {
        if (loaded && input) {
            input.value = 1;
        }
    }

    return <>
        <RiveComponent className='h-[300px] w-[300px]' onMouseEnter={playAnimation} />
        <button onClick={playAnimation}>Play</button>
    </>
}

export default Bell