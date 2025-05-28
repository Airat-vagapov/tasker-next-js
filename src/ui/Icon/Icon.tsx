export type IconProps = {
    name: string;
    size?: number;
    color?: string | "white";
    hovered?: boolean
};

const Icon = ({ name, size, color, hovered = false }: IconProps) => {
    return (
        <>
            <div className={`h-fit flex items-center justify-center ${hovered ? 'hover:text-blueHover transition-all duration-300' : ''}`}>
                <span
                    className={`
                    text-${color}
            text-[32px]
            material-symbols-outlined
            cursor-pointer
            hover:text-blueHover transition-all duration-300
                `}
                    style={{
                        fontSize: `${size}px`,
                        color: `var(--${color})`,
                    }}
                >
                    {name}
                </span >
            </div >
        </>
    );
};

export default Icon;
