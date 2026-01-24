type CardProps = {
    title?: string;
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div className="bg-lightblack rounded-xl p-8">{children}</div>
    )

}

export default Card;