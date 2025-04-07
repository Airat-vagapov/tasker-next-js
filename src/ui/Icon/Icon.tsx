type IconProps = {
    name: string;
    size?: number;
    color?: string | "white";
};

const Icon = ({ name, size, color }: IconProps) => {
    return (
        <>
            <span
                className={`
                    text-${color}
                    text-[32px]
                    material-symbols-outlined
                `}
                style={{
                    fontSize: `${size}px`,
                    color: `var(--${color})`,
                }}
            >
                {name}
            </span>
        </>
    );
};

export default Icon;
