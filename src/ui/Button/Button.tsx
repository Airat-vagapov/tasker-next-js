import Icon, { IconProps } from "@/ui/Icon/Icon";

type ButtonProps = {
    text: string;
    btnType?: "submit" | "reset" | "button" | undefined;
    icon?: IconProps;
    onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ text, btnType, onClick, icon }) => {
    return (
        <button
            type={btnType}
            onClick={onClick}
            className="flex items-center justify-center gap-2 cursor-pointer p-[10px] text-mainwhite bg-blue hover:bg-blueHover duration-300 rounded-lg text-center"
        >
            {icon && <Icon {...icon}></Icon>}
            <span>
                {text}
            </span>
        </button>
    );
};

export default Button;
