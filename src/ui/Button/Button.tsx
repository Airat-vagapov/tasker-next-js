type ButtonProps = {
    text: string;
    onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="cursor-pointer p-[8px] text-black bg-yellow-200 hover:bg-yellow-600 duration-300 rounded-sm"
        >
            {text}
        </button>
    );
};

export default Button;
