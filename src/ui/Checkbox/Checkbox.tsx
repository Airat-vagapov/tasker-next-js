'use client'

import { useState } from "react";
import Icon from "@/ui/Icon/Icon";
type CheckBoxProps = {
    id: string;
    children: React.ReactNode;
    action?: () => void;
}
const Checkbox: React.FC<CheckBoxProps> = ({ id, children, action }) => {
    // States
    const [isChecked, setIsChecked] = useState<boolean>(false);

    return (
        <>
            <div className="relative flex items-center gap-2">
                <input
                    className="w-[1px] h-[1px] pointer-events-none absolute left-0 top-0"
                    id='checkbox'
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                        setIsChecked(!isChecked)
                        if (action) action()
                    }}
                />

                <label htmlFor="checkbox" className="
                w-4 h-4 bg-blue cursor-pointer
                rounded-xs
                ">
                    <div className={
                        `duration-300 transition-all
                        ${isChecked ? 'opacity-100' : 'opacity-0'}`}>
                        <Icon name='check' size={14} />
                    </div>
                </label>
                <label htmlFor="checkbox" className="cursor-pointer">{children}</label>
            </div>
        </>
    )

}
export default Checkbox;