import { ChangeEvent, FocusEvent, useRef } from "react";

type InputProps = {
    label?: string;
    id: string;
    name: string;
    inptType: string;
    onChange: (e: ChangeEvent<any>) => void;
    onBlur: (e: FocusEvent<any, Element>) => void;
    value: string | number;
    errorText?: string;
    disable?: boolean;
};

const Input: React.FC<InputProps> = ({
    label,
    id,
    name,
    inptType,
    onChange,
    onBlur,
    value,
    errorText,
    disable,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleFocus = () => {
        if (disable) {
            inputRef.current?.blur()
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <label htmlFor={name}>{label}</label>
            <div className="relative">
                <input
                    ref={inputRef}
                    className={`bg-mainblack w-full py-4.5 px-3 color-mainwhite rounded-md h-14 transition-all duration-300 
                    border-1  focus:border-blue 
                    ${errorText ? "border-errorRed" : "border-mainblack"}
                    ${disable ? 'cursor-pointer' : ''}
                    `}
                    id={id}
                    name={name}
                    type={inptType}
                    onFocus={handleFocus}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                />
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
