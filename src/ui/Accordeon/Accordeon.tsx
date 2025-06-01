'use client'

import { useState } from "react";

import Icon from "@/ui/Icon/Icon";

type AccordeonProps = {
    title: string;
    content: React.ReactNode | string;

}

const Accordeon: React.FC<AccordeonProps> = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const openHandler = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className="flex flex-col">
            <div
                className="relative flex items-center justify-between cursor-pointer w-full"
                onClick={openHandler}
            >
                <p>{title}</p>
                <div>
                    <Icon name='keyboard_arrow_down' size={20}></Icon>
                </div>
            </div>
            {isOpen &&
                <div>
                    {content}
                </div>
            }

        </div>
    )
}

export default Accordeon;