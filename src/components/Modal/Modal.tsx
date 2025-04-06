import { createPortal } from "react-dom";

type ModalProps = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;
    return createPortal(
        <div>
            <div className="bg-lightblack p-6 fixed z-50 top-[50%] left-[50%]">
                {children}
            </div>
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
        </div>,

        document.body
    );
};

export default Modal;
