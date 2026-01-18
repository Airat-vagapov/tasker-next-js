type TitleProps = {
    children: React.ReactNode
    color?: string;
}

const Title: React.FC<TitleProps> = ({ children, color = 'white' }) => {
    return <p className={`text-xl
        ${color === 'white' ? 'text-white' : 'text-black'}    
        `}
    >{children}</p>;
};

export default Title;
