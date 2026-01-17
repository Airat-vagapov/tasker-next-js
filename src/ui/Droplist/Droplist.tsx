'use client'
import { FormikProps, useField } from 'formik';
import { ChangeEvent, FocusEvent, useEffect, useRef, useState, KeyboardEvent } from "react";

import Input from '@/ui/Input/Input';
import { ISelectData } from '@/types/global';

type DroplistProps<T> = {
    id: string;
    name: string;
    label: string;
    placeholder?: string;
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
    placeholder,
    onChange,
    onBlur,
    value,
    options,
    form,
}: DroplistProps<T>) => {
    const [field, meta, helpers] = useField(name);
    const [listIsOpen, setListIsOpen] = useState<boolean>(false)
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const selectRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Закрытие при клике вне селекта
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setListIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])


    const handleSelect = (option: ISelectData) => {
        helpers.setValue(option.title);
        helpers.setTouched(true); // ✅ Важно для валидации
        setListIsOpen(false);
        buttonRef.current?.focus();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setListIsOpen(true);
                setFocusedIndex(prev => Math.min(prev + 1, options.length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex(prev => Math.max(prev - 1, 0));
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (focusedIndex >= 0) {
                    handleSelect(options[focusedIndex]);
                } else {
                    setListIsOpen(!listIsOpen);
                }
                break;
            case 'Escape':
                setListIsOpen(false);
                break;
        }
    };


    return (
        <div className="relative" ref={selectRef}>
            <div className='relative' onClick={() => setListIsOpen(true)}>
                <Input
                    id={id}
                    name={name}
                    label={label}
                    inptType="text"
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    disable={true}
                    arrow={true}
                    onKeyDown={handleKeyDown}
                    listIsOpen={listIsOpen}
                />
            </div>

            <div className={`absolute w-[100%] top-[calc(100%+8px)] duration-300 transition-all z-1
                ${listIsOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-90 opacity-0 pointer-events-none'}
                `}>
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
                                    handleSelect(item)
                                }}
                            >
                                {item.title}
                            </li>
                        )

                    })}
                </ul>
            </div>

        </div>


    )

}
export default Droplist;