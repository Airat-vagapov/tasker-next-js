import { ChangeEvent, FocusEvent } from "react";

type InputProps = {
    label: string;
    id: string;
    name: string;
    inptType: string;
    onChange: (e: ChangeEvent<any>) => void;
    onBlur: (e: FocusEvent<any, Element>) => void;
    value: string | number;
    errorText?: string;
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
}) => {
    return (
        <div className="flex flex-col gap-4">
            <label htmlFor={name}>{label}</label>
            <div className="relative">
                <input
                    className={`bg-mainblack w-full py-4.5 px-3 color-mainwhite rounded-md h-14 border-1 transition-all duration-300
                        ${errorText ? "border-errorRed" : "border-transparent"}
                    `}
                    id={id}
                    name={name}
                    type={inptType}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                />
                <span
                    className={`absolute top-[4px] left-[12px] text-[10px] text-errorRed transition-all duration-300
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
