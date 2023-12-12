import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "./ui/dialog";

type ModalProps = {
    title: string;
    description: string;
    content: React.ReactNode;
};


const Modal = ({title, description, content}: ModalProps) => {
    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    {description}
                </DialogDescription>
            </DialogHeader>
            {content}
            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <button>Close</button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}
export default Modal

