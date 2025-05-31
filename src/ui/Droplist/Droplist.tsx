'use client'
import { FormikProps } from 'formik';
import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from "react";

import Input from '@/ui/Input/Input';
import { ISelectData } from '@/types/global';

type DroplistProps<T> = {
    id: string;
    name: string;
    label: string;
    onChange: (e: ChangeEvent<any>) => void;
    onBlur: (e: FocusEvent<any, Element>) => void;
    value: string | number;
    options: ISelectData[];
    form: FormikProps<T>;
}

const Droplist = <T,>({
    id,
    name,
    label,
    onChange,
    onBlur,
    value,
    options,
    form,
}: DroplistProps<T>) => {
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
            <div className='relative' onClick={() => setListIsOpen(true)}>
                <Input
                    id={id}
                    name={name}
                    label={label}
                    inptType="text"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    disable={true}
                    arrow={true}
                />
            </div>

            {listIsOpen &&
                <div className='absolute w-[100%] top-[calc(100%+8px)] '>
                    <ul className='flex flex-col bg-mainblack rounded-md'>
                        {options && options.map((item, indx) => {
                            return (
                                <li
                                    className='px-3 transition-all duration-300 cursor-pointer p-2.5
                                        hover:bg-lightblack hover:text-blue 
                                        '
                                    key={indx}
                                    onClick={() => {
                                        setListIsOpen(false)
                                        form.setFieldValue(name, item.title)
                                    }}
                                >
                                    {item.title}
                                </li>
                            )

                        })}
                    </ul>
                </div>
            }

        </div>


    )
}

export default Droplist;