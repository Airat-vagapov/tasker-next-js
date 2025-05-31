import { ChangeEvent, FocusEvent, useRef } from "react";

type TextareaProps = {
    label: string;
    name: string;
    id: string;
    onChange: (e: ChangeEvent<any>) => void;
    onBlur: (e: FocusEvent<any, Element>) => void;
    value: string | number;
    errorText?: string;

}

const Textarea: React.FC<TextareaProps> = ({
    label,
    name,
    id,
    onChange,
    onBlur,
    value,
    errorText,
}) => {
    // const textAreaRef = useRef<HTMLTextAreaElement>(null)

    return (
        <div className="flex flex-col gap-2">
            {label && <p>{label}</p>}
            <div className="relative">
                <textarea
                    className={`px-3 py-3 bg-mainblack text-mainwhite
                border-1 
                transition-all duration-300 
                rounded-md w-full
                ${errorText ? "border-errorRed py-5 focus:border-errorRed" : "border-transparent focus:border-blue"}`}
                    // ref={textAreaRef}
                    name={name}
                    id={id}
                    cols={30}
                    rows={10}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                ></textarea>
                <span
                    className={`absolute top-[4px] left-[12px] text-[12px] text-errorRed transition-all duration-300
                    ${errorText ? "opacity-100" : "opacity-0"}
                    `}
                >
                    {errorText}
                </span>
            </div>
        </div>
    )
}

export default Textarea;