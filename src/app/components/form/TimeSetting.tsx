'use client';
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react"
import { Dialog, DialogClose, DialogTrigger } from "../ui/dialog";
import Modal from "../Modal";

const TimeSetting = ({time, setTime}) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const totalMinutes = hours * 60 + minutes;

    const incrementHours = () => {
        if (hours < 24) {
            setHours(hours + 1);
        }
    };

    const decrementHours = () => {
        if (hours > 0) {
            setHours(hours - 1);
        }
    };

    const incrementMinutes = () => {
        if (minutes < 60) {
            setMinutes(minutes + 10);
        }
    };

    const decrementMinutes = () => {
        if (minutes > 0) {
            setMinutes(minutes - 10);
        }
    };

    const saveTime = () => {
        setTime(totalMinutes);
    }

    const TimeSetup = () => {
        return <>
            <div className="flex flex-col items-center justify-center gap-5">
            Hours
                <div className="flex flex-row justify-center items-center gap-5">
                  
                    <div>
                        <button onClick={decrementHours} className="btn-mini">
                            <ArrowDown/>
                        </button>
                    </div>
                    <div className="text-2xl">
                        {hours}
                    </div>
                    <div>
                        <button onClick={incrementHours} className="btn-mini">
                            <ArrowUp/>
                        </button>
                    </div>
                </div>
                Minutes
                <div className="flex flex-row justify-center items-center gap-5">
                    <div>
                        <button onClick={decrementMinutes} className="btn-mini">
                            <ArrowDown/>
                        </button>
                    </div>
                    <div className="text-2xl">
                        {minutes}
                    </div>
                    <div>
                        <button onClick={incrementMinutes} className="btn-mini">
                            <ArrowUp/>
                        </button>
                    </div>
                </div>
                <DialogClose>
                    <button className="btn-action" onClick={saveTime}>Save</button>
                </DialogClose>
            </div>
        </>
    }

    const renderDialog = () => {
        return <Modal title='Set time' content={<TimeSetup/>}/>
    }

    return (
        <div className="flex justify-center space-x-4">
            <Dialog>
                <div className="flex flex-col items-center relative">
                    <div className='flex flex-row justify-center items-center gap-1'>
                        <div>
                            {hours}
                        </div>
                        <div className="text-gray-500">
                            H
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className='flex flex-row'>
                        <div>
                            {minutes}
                        </div>
                        <div className="text-gray-500">
                            min
                        </div>
                    </div>
                </div>
                {renderDialog()}
                <DialogTrigger>
                    <button className="btn-action">setup</button>
                </DialogTrigger>
            </Dialog>
        </div>
    );
}

export default TimeSetting