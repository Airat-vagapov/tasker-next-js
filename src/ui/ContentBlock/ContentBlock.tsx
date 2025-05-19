type ContentBlockProps = {
    children: React.ReactNode;
    classes?: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ children, classes }) => {
    console.log(classes)
    return (
        <div className={`p-8 rounded-xl bg-lightblack 
        ${classes ? classes : ''}`}>
            {children}
        </div>
    )
}

export default ContentBlock;