'use client';
import { DailyTypes } from "@/data/enums"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { AlarmClockIcon, MoonStarIcon, SunIcon, SunsetIcon } from "lucide-react"
import { useState } from "react"



const FormDayType = ({ setDayType }) => {
    const [morningColor, setMorningColor] = useState('#EEFF87')
    const [noonColor, setNoonColor] = useState('#EEFF87')
    const [eveningColor, setEveningColor] = useState('#EEFF87')
    const [nightColor, setNightColor] = useState('#EEFF87')
    const iconSize = 25
    const iconStroke = 0.75
    const DayTypes = () => [
        { name: 'Morning', value: 'morning', id: 1, icon: <AlarmClockIcon strokeWidth={iconStroke} size={iconSize} color={morningColor}/> },
        { name: 'Afternoon', value: 'afternoon', id: 2, icon: <SunIcon strokeWidth={iconStroke} size={iconSize} color={noonColor}/>},
        { name: 'Evening', value: 'evening', id: 3, icon: <SunsetIcon strokeWidth={iconStroke} size={iconSize} color={eveningColor}/> },
        { name: 'Night', value: 'night', id: 4, icon: <MoonStarIcon strokeWidth={iconStroke} size={iconSize} color={nightColor}/> },
    ]
    return <>
        <div className="cat-row">
            <div>When?</div>
                <ToggleGroup type="multiple">
                     {DayTypes().map((d, i) => <ToggleGroupItem value={d.value} aria-label={d.name}
                        onClick={() => setDayType(d)} key={i}>
                            {d.icon}
                        </ToggleGroupItem>
                     )}
                </ToggleGroup>
        </div></>
}

export default FormDayType