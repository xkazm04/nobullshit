import { ArrowDown, ArrowUp } from "lucide-react";

type Props = {
    cd: {
        hours: number,
        minutes: number,
        seconds: number
    },
    setCd: (cd: any) => void
}

const CountdownSetup = ({ cd, setCd }: Props) => {
    let arrowSize = 23;
    return <>
        <div className='flex flex-row gap-5 py-5'>
            <div className='flex bg-gray-950 p-2 rounded-xl border border-gray-400/30 gap-4'>
                <button onClick={() => setCd((prevCd: typeof cd) => ({ ...prevCd, hours: prevCd.hours + 1 }))}>
                    <ArrowUp size={arrowSize} />
                </button>
                h
                {cd.hours > 0 ? <button onClick={() => setCd((prevCd: typeof cd) => ({ ...prevCd, hours: prevCd.hours - 1 }))}>
                    <ArrowDown size={arrowSize} />
                </button> : <button disabled><ArrowDown size={arrowSize} /></button>}
            </div>
            <div>
                <div className='flex bg-gray-950 p-2 rounded-xl border border-gray-400/30 gap-4'>
                    <button onClick={() => setCd((prevCd: typeof cd) => ({ ...prevCd, minutes: prevCd.minutes + 1 }))}>
                        <ArrowUp size={arrowSize} />
                    </button>
                    min
                    {cd.minutes > 0 ? <button onClick={() => setCd((prevCd: typeof cd) => ({ ...prevCd, minutes: prevCd.minutes - 1 }))}>
                        <ArrowDown size={arrowSize} />
                    </button> : <button disabled><ArrowDown size={arrowSize} /></button>}
                </div>
            </div>
        </div>
    </>
}

export default CountdownSetup;