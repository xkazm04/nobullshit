import { FormTextInput } from "./FormTextInput"

type Props = {
    setName: (name: string) => void
}

const FormName = ({setName}: Props) => {
    return <>
        <FormTextInput setNew={setName} label={'Habit name'} type={'text'} />
    </>
}

export default FormName