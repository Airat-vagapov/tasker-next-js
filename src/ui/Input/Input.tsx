import { ChangeEvent, FocusEvent } from "react";

type InputProps = {
    label: string;
    id: string;
    name: string;
    inptType: string;
    onChange: (e: ChangeEvent<any>) => void;
    onBlur: (e: FocusEvent<any, Element>) => void;
    value: string | number;
};

const Input: React.FC<InputProps> = ({
    label,
    id,
    name,
    inptType,
    onChange,
    onBlur,
    value,
}) => {
    return (
        <div className="flex flex-col gap-4">
            <label htmlFor="">{label}</label>
            <input
                className="bg-mainblack p-2 color-mainwhite"
                id={id}
                name={name}
                type={inptType}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
            />
        </div>
    );
};

export default Input;
