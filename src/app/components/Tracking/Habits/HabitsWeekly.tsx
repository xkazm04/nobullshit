import { CheckCheckIcon, PenIcon, XCircleIcon } from "lucide-react";
import { getCategoryColor } from "@/app/lib/colorGetter";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import Modal from "../../Modal";
import HabitMenu from "./HabitMenu";

const HabitsWeekly = ({trackers,handleCheck }) => {
    const renderDialog = ({habitId}) => {
        return <Modal title={'Manage habit'} description={''} content={<HabitMenu habitId={habitId}/>} />
    }
    // Přidat ikonku a edit
    return <Dialog>
        {trackers.map(tracker => (
            <div key={tracker.id} className="flex items-center justify-between py-2 relative border-b border-transmain">
                <div className="flex text-[11px] min-w-[150px]" style={{ color: getCategoryColor(tracker.category) }}>
                    {tracker.name}
                </div>
                <DialogTrigger asChild>
                    <PenIcon strokeWidth={2} size={24}/>
                </DialogTrigger>
                <div className="flex flex-row justify-end gap-4 w-full">
                    {tracker.completed.map((completed, index) => (
                        <button key={index} onClick={() => handleCheck(tracker.id, index)}
                            className="bg-slate-900 p-1 rounded-xl"
                        >             
                            {completed ? <CheckCheckIcon className="h-4 w-4" style={{ color: getCategoryColor(tracker.category) }} /> : <XCircleIcon className="h-4 w-4 text-gray-500" />}
                        </button>
                    ))}
                </div>
                {renderDialog({habitId: tracker.id})}
            </div>
        ))}
    </Dialog>
}

export default HabitsWeekly;