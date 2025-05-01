'use client'
import Input from '@/ui/Input/Input';
import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from "react";
import { ISelectData } from '@/types/global';

type DroplistProps = {
    id: string;
    name: string;
    label: string;
    onChange: (e: ChangeEvent<any>) => void;
    onBlur: (e: FocusEvent<any, Element>) => void;
    value: string | number;
    options: ISelectData[];
}

const Droplist: React.FC<DroplistProps> = ({
    id,
    name,
    label,
    onChange,
    onBlur,
    value,
    options,
}) => {
    const [listIsOpen, setListIsOpen] = useState<boolean>(false)
    const selectRef = useRef<HTMLDivElement>(null)

    // Закрытие при клике вне селекта
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setListIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.addEventListener('mousedown', handleClickOutside);
        }
    }, [])

    return (
        <div className="relative" ref={selectRef}>
            <div onClick={() => setListIsOpen(true)}>
                <Input
                    id={id}
                    name={name}
                    label={label}
                    inptType="text"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                />
            </div>

            {listIsOpen &&
                <div className='absolute w-[100%] '>
                    <ul className='flex flex-col gap-2 bg-mainblack p-1'>
                        {options && options.map((item, indx) => {
                            return (
                                <>
                                    <li key={indx}>{item.title}</li>
                                </>
                            )

                        })}
                    </ul>
                </div>
            }

        </div>


    )
}

export default Droplist;