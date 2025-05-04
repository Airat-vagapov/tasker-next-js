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
            className="cursor-pointer p-[10px] text-mainwhite bg-blue hover:bg-blueHover duration-300 rounded-lg"
        >
            {text}
        </button>
    );
};

export default Button;
