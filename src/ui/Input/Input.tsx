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
            <label htmlFor="">{label}</label>
            <div className="">
                <input
                    className="bg-mainblack w-full p-2 color-mainwhite rounded-md h-14"
                    id={id}
                    name={name}
                    type={inptType}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                />
                {errorText && <span>{errorText}</span>}
            </div>
        </div>
    );
};

export default Input;
