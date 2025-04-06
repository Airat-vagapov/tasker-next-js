type ButtonProps = {
    text: string;
    onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="cursor-pointer p-[8px] text-mainwhite bg-blue hover:bg-blueHover duration-300 rounded-sm"
        >
            {text}
        </button>
    );
};

export default Button;
