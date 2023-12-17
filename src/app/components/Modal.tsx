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
    h?: string;
};


const Modal = ({title, description, content, h}: ModalProps) => {
    return (
        <DialogContent className={`sm:max-w-md ${h}`}>
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

