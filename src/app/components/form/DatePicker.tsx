import { DialogTrigger } from "../ui/dialog"

const DatePicker = ({nextDay, prevDay, fullDate}:any) => {
    return <div className="flex flex-row justify-center font-bold mb-5" >
    <div className="">
        <button className="text-main lg:hover:cursor-pointer px-2 py-1" onClick={() => { prevDay() }}>{"<"}</button>
    </div>
    <div>
        <DialogTrigger asChild>
            <button className="btn-mini mx-8 bg-transmain w-[150px]">
                {fullDate}
            </button>
        </DialogTrigger>
    </div>
    <div className="">
        <button className="text-main lg:hover:cursor-pointer px-2 py-1" onClick={() => { nextDay() }}>{">"}</button>
    </div>
    </div>
}



export default DatePicker