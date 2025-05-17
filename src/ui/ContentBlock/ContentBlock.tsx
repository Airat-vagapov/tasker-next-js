type ContentBlockProps = {
    children: React.ReactNode;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ children }) => {
    return (
        <div className="p-8 rounded-xl bg-lightblack">
            {children}
        </div>
    )
}

export default ContentBlock;