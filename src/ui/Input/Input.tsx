import { ChangeEvent, FocusEvent, useRef, KeyboardEvent } from "react";
import Icon from '@/ui/Icon/Icon';
import Tooltip from "../Tooltip/Tooltip";
import { useField } from "formik";

type InputProps = {
    label?: string;
    id: string;
    name: string;
    placeholder?: string,
    inptType: string;
    // onChange: (e: ChangeEvent<any>) => void;
    // onBlur: (e: FocusEvent<any, Element>) => void;
    // value: string | number;
    errorText?: string;
    disable?: boolean;
    arrow?: boolean;
    listIsOpen?: boolean;
    onKeyDown?: (e: KeyboardEvent<HTMLButtonElement>) => void;
    tooltipText?: string;
};

const Input: React.FC<InputProps> = ({
    label,
    id,
    name,
    placeholder,
    inptType,
    errorText,
    disable,
    arrow,
    listIsOpen,
    onKeyDown,
    tooltipText
}) => {
    // Formik field
    const [field, meta, helpers] = useField(name);

    const inputRef = useRef<HTMLInputElement>(null);
    const handleFocus = () => {
        if (disable) {
            inputRef.current?.blur()
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2">
                <label htmlFor={name}>{label}</label>
                {tooltipText && <Tooltip text={tooltipText} />}

            </div>
            <div className="relative">
                <input
                    ref={inputRef}
                    className={`bg-mainblack w-full py-4.5 px-3 color-mainwhite rounded-md h-14 transition-all duration-300 
                    border-1
                    ${errorText ? "border-errorRed focus:border-errorRed" : "border-transparent focus:border-blue "}
                    ${disable ? 'cursor-pointer' : ''}
                    `}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    type={inptType}
                    onFocus={handleFocus}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                />
                {arrow &&
                    <div className={`absolute top-1/2 -translate-y-1/2 right-2 text-gray duration-300
                    ${listIsOpen ? 'rotate-180' : ''}
                    `}>
                        <Icon name={'keyboard_arrow_down'} />
                    </div>
                }

                <span
                    className={`absolute top-[4px] left-[12px] text-[12px] text-errorRed transition-all duration-300
                    ${errorText ? "opacity-100" : "opacity-0"}
                    `}
                >
                    {errorText}
                </span>
            </div>
        </div>
    );
};

export default Input;
