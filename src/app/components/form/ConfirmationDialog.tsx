import { IlustratedFire } from "../icons/illustrations";
import { DialogClose } from "../ui/dialog";

const ConfirmationDialog = ({yesFn}) => {
    return <div className="w-full h-full mt-10 ">
        <div className="flex flex-col items-center justify-center">
            <div><IlustratedFire/></div>
        <div className="flex flex-row justify-center items-center px-5 gap-10">
            <div className="title">Are you sure ?</div>
            <DialogClose>
                <div>
                    <button className="btn-mini bg-transparent">No</button>
                </div>
            </DialogClose>
            <div>
                <button onClick={yesFn} className="btn-mini bg-red-950">Yes</button>
            </div>
        </div>
        </div>
    </div>
}

export default ConfirmationDialog;