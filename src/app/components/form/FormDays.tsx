type Props = {
    habitDays: boolean[],
    setHabitDays: (habitDays: boolean[]) => void,
    label: string
}

const FormDays = ({habitDays, setHabitDays, label}: Props) => {
    return (<>
        <div className="cat-row">{label}</div>
        <div className="flex flex-row justify-center gap-5 my-5">
            {habitDays.map((d, i) => <div className="flex flex-col items-center gap-2 lg:cursor-pointer">
                <div className="text-gray-300">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</div>
                <div className={`w-8 h-8 rounded-full flex flex-col justify-center items-center lg:hover:bg-transmain
            ${d ? 'bg-main text-gray-900' : 'bg-gray-900 text-gray-300'}`}
                    onClick={() => setHabitDays(habitDays.map((d, j) => i === j ? !d : d))}
                >
                    {i + 1}
                </div>
            </div>)}
        </div>
    </>)
}

export default FormDays