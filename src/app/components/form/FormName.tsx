import { FormTextInput } from "./FormTextInput"

type Props = {
    setName: (name: string) => void
}

const FormName = ({setName}: Props) => {
    return <>
        <div className="cat-row">
            <div>Tracker name</div>
            <FormTextInput setNew={setName} label={'Tracker name'} type={'text'} />
        </div>
    </>
}

export default FormName