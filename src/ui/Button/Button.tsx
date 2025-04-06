type ButtonProps = {
    text: string;
    btnType?: "submit" | "reset" | "button" | undefined;
    onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ text, btnType, onClick }) => {
    return (
        <button
            type={btnType}
            onClick={onClick}
            className="cursor-pointer p-[8px] text-mainwhite bg-blue hover:bg-blueHover duration-300 rounded-sm"
        >
            {text}
        </button>
    );
};

export default Button;
