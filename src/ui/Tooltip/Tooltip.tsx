import { useState } from "react";
import Icon from "../Icon/Icon";


type TooltipProps = {
    children?: React.ReactNode;
    text?: string
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <div className="relative inline-flex items-center"
            onMouseEnter={() => { setIsOpen(true) }}
            onMouseLeave={() => { setIsOpen(false) }}
        >
            <Icon name={'info'}></Icon>
            {

                <div className={`
                    absolute z-50 top-0 left-[calc(100%+4px)] 
                    rounded-xl shadow-lg bg-white p-4
                    transition-all duration-300
                    min-w-[200px] max-w-[300px] w-fit
                ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0  pointer-events-none'} 
                `}>
                    {/* <div className="flex"> */}
                    <>
                        {children}
                    </>
                    <p className="text-black whitespace-normal">{text}</p>
                    {/* </div> */}
                </div>
            }

        </div >
    )
}

export default Tooltip;