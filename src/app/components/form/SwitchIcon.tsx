type Props = {
    bgColor: string,
    active: string,
    myState: string,
    icon: any,
    setActive: any,
}

const SwitchIcon = ({bgColor, active, myState, icon, setActive}: Props) => {
return <>
    <div className={`${active === myState ? `${bgColor}` : 'text-gray-500 bg-gray-950'}
        p-1 rounded-xl md:hover:text-gray-700 md:cursor-pointer animate-fadeIn transition-all duration-500 ease-in-out
    `}
        onClick={() => {setActive(myState)}}
    >{icon}</div>

</>
}

export default SwitchIcon