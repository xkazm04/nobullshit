import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";

type ModalProps = {
    title: string;
    description?: string;
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
        </DialogContent>
    )
}
export default Modal

