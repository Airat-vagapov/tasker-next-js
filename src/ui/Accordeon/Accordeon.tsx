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
        <div className="flex flex-col w-full">
            <div
                className="relative flex items-center justify-between cursor-pointer w-full
                py-2"
                onClick={openHandler}
            >
                <p className="text-xl font-bold">{title}</p>
                <div className={`translate-all duration-400 ${isOpen ? 'rotate-180' : ''}`}>
                    <Icon name='keyboard_arrow_down' size={20}></Icon>
                </div>
            </div>
            <div className={`
            transition-all duration-800 overflow-hidden
                ${isOpen ? "max-h-96" : 'max-h-0'}
                `}>
                {content}
            </div>


        </div>
    )
}

export default Accordeon;