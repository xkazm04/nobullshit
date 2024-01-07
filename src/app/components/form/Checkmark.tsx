import { CheckIcon, BanIcon } from "lucide-react"

type Props = {
    check: any,
    condition: boolean,
}

const Checkmark = ({ check, condition }: Props) => {
    return <>
        {condition ? <>
            <div className="text-green-500 bg-green-950 rounded-xl  md:hover:text-green-700 md:cursor-pointer animate-fadeIn transition-all duration-500 ease-in-out"
                onClick={() => { check(false) }}>
                <CheckIcon strokeWidth={0.75} color={'#5ff780'} />
            </div>
        </> : <>
            <div className="text-gray-300 bg-gray-900 rounded-xl md:hover:text-gray-700 md:cursor-pointer"
                onClick={() => { check(true) }}>
                    <BanIcon strokeWidth={0.75} color={'#7c7c7c'} />
            </div>
        </>}
    </>
}

export default Checkmark;