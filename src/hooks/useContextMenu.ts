import { useState } from "react";

export const useContextMenu = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false); 

    

    return {isOpen, setIsOpen}
}