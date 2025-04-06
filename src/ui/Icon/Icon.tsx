type IconProps = {
    name: string;
    size?: number;
    color?: string;
};

const Icon = ({ name, size, color }: IconProps) => {
    return (
        <>
            <span
                className={`
                    material-symbols-outlined
                    ${size ? `text-[${size}px]` : "text-[24px]"}
                    ${color ? `text-${color}` : "text-white"}
                `}
            >
                {name}
            </span>
        </>
    );
};

export default Icon;
