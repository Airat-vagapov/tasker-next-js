import { useEffect, useState } from "react";

export const useContextMenu = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false); 

    useEffect(() => { 
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.context-menu')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])

    return {isOpen, setIsOpen}
}