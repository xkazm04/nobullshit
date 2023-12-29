type Props = {
    habitDays: boolean[],
    setHabitDays: (habitDays: boolean[]) => void,
    label: string
}

const FormDays = ({habitDays, setHabitDays, label}: Props) => {
    return (<>
        <div className="cat-row">{label}</div>
        <div className="flex flex-row justify-center gap-5 my-5 bg-gray-600/20 rounded-xl py-3 px-4">
            {habitDays.map((d, i) => <div key={i} className="flex flex-col items-center gap-2 lg:cursor-pointer">
                <div className="text-gray-300">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</div>
                <div className={`w-8 h-8 rounded-xl flex flex-col justify-center items-center 
            ${d ? 'bg-main text-gray-950 animate-pulse-scale transition-color' : 'bg-gray-900 text-gray-300'}`}
                    onClick={() => setHabitDays(habitDays.map((d, j) => i === j ? !d : d))}>
                    {i + 1}
                </div>
            </div>)}
        </div>
    </>)
}

export default FormDays