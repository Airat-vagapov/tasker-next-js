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
            <textarea
                className="p-3 bg-mainblack text-mainwhite
                border-1 border-transparent focus:border-blue
                transition-all duration-300 
                rounded-md"
                // ref={textAreaRef}
                name={name}
                id={id}
                cols={30}
                rows={10}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
            ></textarea>
        </div>
    )
}

export default Textarea;