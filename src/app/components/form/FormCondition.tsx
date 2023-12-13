import { Switch } from "../ui/switch"
type FormConditionProps = {
    checked: boolean
    setChecked: (checked: boolean) => void
    text: string
}
const FormCondition = ({checked, setChecked, text}: FormConditionProps) => {
    return <div className="flex justify-betwen items-center space-x-2 px-1">
    <Switch
      id="email-newsletter"
      checked={checked}
      onCheckedChange={setChecked}
    />
        <div className={`${checked ? 'text-green-300' : 'text-gray-300'} text-sm transition-colors delay-75`}>
            {text}
        </div>
    </div>
}

export default FormCondition