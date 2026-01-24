type CardProps = {
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
    return (
        <div className="bg-lightblack rounded-xl p-8">{children}</div>
    )

}

export default Card;