import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    date: Date,
    setDate: (date: Date) => void
}

const CustomInput = forwardRef(({ value, onClick }: any, ref) => (
    <button className="input-full px-5" onClick={onClick} ref={ref}>
        {value}
    </button>
));


const FormDateComponent = ({date, setDate}: Props) => {
    return     <DatePicker 
                    selected={date} 
                    onChange={(date: any) => setDate(date)} 
                    customInput={<CustomInput />} 
                    calendarClassName="cal"
                    dateFormat="dd.MM.yyyy"
                    />
}

export default FormDateComponent