type PageTitleProps = {
    children: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
    const getTaskById = async (id: string) => {

    }
    return (
        <>
            <h1 className="text-3xl font-bold">{children}</h1>
        </>
    );
}

export default PageTitle;