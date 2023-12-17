type FormTextInputProps = {
    setNew: (arg: string) => void;
    placeholder: string;
    label: string;
    type: string;
}

export const FormTextInput = ({setNew, placeholder, label, type}: FormTextInputProps) => {
    return  <div className="flex flex-row justify-between w-full gap-10">
    <div className="title-menu">{label}</div>
    <div><input className="input py-1 px-4" type={type} placeholder={placeholder} onChange={e => setNew(e.target.value)}
        maxLength={type === 'text' ? 25 : 10}
    /></div>
</div>
}

