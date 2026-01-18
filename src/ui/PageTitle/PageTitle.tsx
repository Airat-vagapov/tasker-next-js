type PageTitleProps = {
    children: React.ReactNode;
    color?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ children, color = 'white' }) => {
    return (
        <>
            <h1 className={`text-3xl font-bold 
                ${color === 'gray' ? 'text-gray' : 'text-white'}`}
            >{children}
            </h1>
        </>
    );
}

export default PageTitle;