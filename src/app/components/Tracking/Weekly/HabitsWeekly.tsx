'use client';
import { getCategoryColor } from "@/app/lib/colorGetter";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import Modal from "../../Modal";
import HabitMenu from "./HabitMenu";
import { useCallback, useRef } from "react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import { Habits } from "@/app/types/TrackerTypes";
import HabitCompletions from "./HabitCompletions";
import { categories } from "@/data/enums";

const HabitsWeekly = ({ habits}: Habits ) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const renderDialog = (habitId: string) => {
        return <Modal title={'Manage habit'} description={''} content={<HabitMenu habitId={habitId} />} />
    }
    const onUpdate = useCallback(({ x, y, scale }: any) => {
        const div = ref.current;
        if (div) {
            const value = make3dTransformValue({ x, y, scale });

            div.style.setProperty("transform", value);
        }
    }, []);

    return <>  
        <Dialog>
            <QuickPinchZoom onUpdate={onUpdate}>
                <div ref={ref}>
                {habits && [...habits].sort((a, b) => a.category - b.category).map(h => (
                    <div key={h.id} className="flex items-center justify-between py-2 relative border-b border-transmain shadow-sm shadow-purple-950">
                        <DialogTrigger asChild>
                            <div className="flex flex-col min-w-[120px] relative" style={{ color: getCategoryColor(h.category) }}>
                                <div className="text-xs lg:text-sm">{h.name}</div>
                                <div className="text-[10px] -bottom-4 opacity-60 absolute">
                                    {categories[h.category].name}
                                </div>
                            </div>
                        </DialogTrigger>
                        {renderDialog(h.id as string)}
                        <HabitCompletions habit={h} />
                    </div>
                ))}
                </div>
            </QuickPinchZoom>
        </Dialog>
    </>
}

export default HabitsWeekly;