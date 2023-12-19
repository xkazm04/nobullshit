import { ChangeEvent, useState } from 'react';
import { Dialog, DialogClose, DialogTrigger } from '../ui/dialog';
import Modal from '../Modal';
import { RecurrenceObject, RecurrenceRepetition } from '@/app/types/TrackerTypes';
import FormDays from './FormDays';
import FormDateComponent from './FormDateComponent';


const FormDateSetting = ({ setRecurrence }: any) => {
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    const [recurrenceType, setRecurrenceType] = useState<RecurrenceRepetition>('Week');
    const [recurrenceInterval, setRecurrenceInterval] = useState(0);
    const [specificDays, setSpecificDays] = useState([false, false, false, false, false, false, false]);

    const today = new Date();
    // Give me today + 1 month
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

    const renderDialog = () => {
        return <Modal title={'Date customization'} content={<FormContent />} />
    }

    const handleRecurrenceChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setRecurrenceType(event.target.value as RecurrenceRepetition);
    };

    const handleSave = () => {
        const newRecurrence: RecurrenceObject = {
            dateFrom: dateFrom,
            dateTo: dateTo,
            isRecurring: true,
            recurrenceType: recurrenceType,
            recurrenceInterval: recurrenceInterval,
            specificDays: specificDays,
        }
        setRecurrence(newRecurrence);
    }


    const FormContent = () => {
        return <>
            <div className='divider' />
        
            <div className="flex flex-row justify-between gap-5 py-2">
                <div  className="flex flex-col gap-2">
                    <label className="title-menu">Start Date</label>
                    <FormDateComponent date={today} setDate={setDateFrom} />
                </div>
                <div className='flex flex-col items-center justify-center'>---------</div>
                <div className="flex flex-col gap-2">
                    <label className="title-menu" >End Date</label>
                    <FormDateComponent date={nextMonth} setDate={setDateTo} />
                </div>
            </div>
            <div className='divider' />
            <div className="flex flex-row gap-8">
                <div><label className="title-menu">Repeat every</label></div>
                <div><input
                    type="number"
                    className="bg-gray-950 border border-gray-500 text-gray-200 max-w-[60px] rounded-xl text-center p-1"
                    max={5}
                    min={1}
                    value={recurrenceInterval}
                    onChange={(e) => { setRecurrenceInterval(parseInt(e.target.value)) }}
                />
                </div>
                <div>
                    <select value={recurrenceType} onChange={handleRecurrenceChange} className="bg-gray-950 border border-transmain px-4 py-1 ">
                        <option className='py-2' value="Week">Week</option>
                        <option className='py-2' value="Month">Month</option>
                    </select>
                </div>
            </div>
            <div className='divider' />
            <div className="mb-2">
                <FormDays habitDays={specificDays} setHabitDays={setSpecificDays} label={'Repeat on'} />
            </div>
            <div className='divider' />
            <div className="flex flex-row justify-center">
                <DialogClose>
                    <button className="btn-action" type="submit"  onClick={handleSave}>
                        Create your first goal
                    </button>
                </DialogClose>
            </div>
        </>
    }

    return (
        <Dialog>
            <DialogTrigger>
                <button className="btn-action">Setup</button>
            </DialogTrigger>
            {renderDialog()}
        </Dialog>
    );
};

export default FormDateSetting;