type ButtonProps = {
    text: string;
};

const Button: React.FC<ButtonProps> = ({ text }) => {
    return <button className="cursor-pointer p-[8px] bg-orange-400 rounded-sm">{text}</button>;
};

export default Button;
