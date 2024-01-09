import ConfirmationModal from "./ConfirmationModal";

export type VolumeObject = {
    start: number;
    target: number;
    units: string;
}

type Props = {
    volume: VolumeObject;
    setVolume: (arg: VolumeObject) => void;
}

const units = ['minutes', 'hours', 'repetitions', 'score', 'units']

const FormVolume = ({ volume, setVolume }: Props) => {
    const updateVolumeStart = (value: number) => {
        setVolume({ ...volume, start: value })
    }

    const updateVolumeUNits = (value: string) => {
        setVolume({ ...volume, units: value })
    }


    return <div className="flex relative my-3 gap-5">
        <div>
            <input
                id='in'
                className="block rounded-xl w-full min-w-[250px] text-lg bg-gray-600/20  appearance-none px-6 pt-4 pb-1 peer border border-slate-600/20
            focus:outline-none focus:ring-0"
                type={'text'}
                placeholder=""
                onChange={e => updateVolumeStart(Number(e.target.value))}
                onKeyPress={event => {
                    if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                    }
                }}
                maxLength={10}
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
        ">Min. volume per repetition</label>
        </div>
        <ConfirmationModal
            trigger=
            {<div className="flex bg-gray-500/10 px-6 py-4 rounded-xl min-w-[150px] justify-center">
                <div className="text-main font-sans">
                    {volume && volume.units ? volume.units : 'units'}
                </div>
                <div></div>
            </div>}
            content={<>
                {units.map((u, i) => (
                    <div key={i} className={`flex flex-row  w-full py-2 px-3 transition-all duration-300 ease-in-out md:cursor-pointer
                    ${volume && volume.units === u ? 'bg-gray-800 text-main' : 'hover:bg-gray-700/50 text-gray-600 hover:text-gray-400'}`}
                        onClick={() => updateVolumeUNits(u)}
                    >
                        <div className={'md:cursor-pointer text-xs md:text-sm'}>
                            {u}
                        </div>
                    </div>
                ))}
            </>} />
    </div>
}

export default FormVolume

