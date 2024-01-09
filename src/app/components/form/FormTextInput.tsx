type FormTextInputProps = {
    setNew: (arg: string) => void;
    label: string;
    type: string;
}

export const FormTextInput = ({setNew, label, type}: FormTextInputProps) => {
    return  <div className="relative">

    <input id='in' className="block rounded-xl w-full min-w-[250px] text-lg bg-gray-600/20  appearance-none px-6 pt-4 pb-1 peer border border-slate-600/20
       focus:outline-none
       focus:ring-0" 
        type={type} 
        placeholder=""
        onChange={e => setNew(e.target.value)}
        maxLength={type === 'text' ? 25 : 10} 
        autoComplete="off"
    /> 
    <label htmlFor="in" className="absolute text-sm text-zinc-400 
        duration-200 transform -translate-y-6
        scale-75 top-4 z-10 origin-[0] left-6 
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75 
        peer-focus:-translate-y-6
        pointer-events-none
    ">{label}</label>
</div>
}

