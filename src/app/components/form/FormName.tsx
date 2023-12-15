type Props = {
    setName: (name: string) => void
}

const FormName = ({setName}: Props) => {
    return <>
        <div className="cat-row">
            <div>Tracker name</div>
            <div><label htmlFor="habitName" className="sr-only">Tracker name</label>
                <input
                    className="input"
                    type="text"
                    placeholder="Daily pushups"
                    onChange={e => setName(e.target.value)}
                    autoComplete="off"
                    maxLength={25}
                /></div>
        </div>
    </>
}

export default FormName