import { CheckIcon, BanIcon } from "lucide-react"

const Checkmark = ({ check, condition }) => {
    return <>
        {condition ? <>
            <div className="text-green-500 bg-green-950 rounded-xl  lg:hover:text-green-700 lg:cursor-pointer"
                onClick={() => { check(false) }}>
                <CheckIcon strokeWidth={0.75} color={'#5ff780'} />
            </div>
        </> : <>
            <div className="text-gray-300 bg-gray-900 rounded-xl lg:hover:text-gray-700 lg:cursor-pointer"
                onClick={() => { check(true) }}>
                <div className="text-gray-300 bg-gray-900 rounded-xl lg:hover:text-gray-700 lg:cursor-pointer"
                    onClick={() => { check(true) }}>
                    <BanIcon strokeWidth={0.75} color={'#7c7c7c'} />
                </div>
            </div>
        </>}
    </>
}

export default Checkmark;