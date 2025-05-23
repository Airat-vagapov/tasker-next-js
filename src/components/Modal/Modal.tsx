import Icon from "@/ui/Icon/Icon";
import { useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {

    // Блок скролла при открытии модалки
    useEffect(() => {
        isOpen
            ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = "");
    }, [isOpen])


    // Если модалка не открыта не рендерим 
    if (!isOpen) return null;
    
    
    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center 
            ${!isOpen ? "pointer-events-none" : ""}
        `}
        >
            <div
                className={`bg-lightblack p-6 w-full max-w-md relative rounded-lg z-50 transform transition-all duration-300 
                    ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                    } `}
            >
                <div
                    onClick={onClose}
                    className="absolute right-[24px] z-10 cursor-pointer hover:text-blueHover transition-all duration-300"
                >
                    <Icon name={"close"} />
                </div>
                {children}
            </div>
            <div
                className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 
                    ${isOpen ? "opacity-100" : "opacity-0"}
                `}
                onClick={onClose}
            />
        </div>,
        document.body
    );
};

export default Modal;
