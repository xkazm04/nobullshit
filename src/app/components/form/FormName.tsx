const FormName = ({setName}) => {
    return <>
        <div className="cat-row">
            <div>Habit name</div>
            <div><label htmlFor="habitName" className="sr-only">Habit Name</label>
                <input
                    className="input"
                    type="text"
                    placeholder="Daily pushups"
                    onChange={e => setName(e.target.value)}
                    autoComplete="off"
                /></div>
        </div>
    </>
}

export default FormName