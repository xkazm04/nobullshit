import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    date: Date,
    setDate: (date: Date) => void
}

const CustomInput = forwardRef<HTMLButtonElement, { value: string, onClick: () => void }>(
    ({ value, onClick }, ref) => (
        <button className="input-full px-5" onClick={onClick} ref={ref}>
            {value}
        </button>
    )
);

CustomInput.displayName = 'CustomInput';


const FormDateComponent = ({date, setDate}: Props) => {
    const onclick = () => console.log('clicked')
    return     <DatePicker 
                    selected={date} 
                    onChange={(date: any) => setDate(date)} 
                    customInput={<CustomInput value={'Custom'} onClick={onclick} />} 
                    calendarClassName="cal"
                    dateFormat="dd.MM.yyyy"
                    />
}

export default FormDateComponent