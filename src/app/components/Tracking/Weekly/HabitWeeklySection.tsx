import { getCategoryColor } from "@/app/lib/colorGetter";
import { DialogTrigger } from "../../ui/dialog";
import HabitCompletions from "./HabitCompletions";
import Modal from "../../Modal";
import HabitMenu from "./HabitMenu";
import { Habits } from "@/app/types/TrackerTypes";
type Props = {
    habits: Habits,
    title: string
}

const HabitWeeklySection = ({habits,title}:Props) => {
    const renderDialog = (habitId: string) => {
        return <Modal title={'Manage habit'} description={''} content={<HabitMenu habitId={habitId} />} />
    }
    return <>
        <div>{title}</div>
        {/* @ts-ignore */}
        {habits && habits.map(h => (
            <div key={h.id} className="flex items-center justify-between py-2 relative border-b border-transmain shadow-sm shadow-purple-950">
                <DialogTrigger asChild>
                    <div className="flex text-[11px] min-w-[120px]" style={{ color: getCategoryColor(h.category) }}>
                        {h.name}
                    </div>
                </DialogTrigger>
                {renderDialog(h.id as string)}
                <HabitCompletions habit={h} />
            </div>
        ))}</>
}

export default HabitWeeklySection;