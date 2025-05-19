type ContainerProps = {
    children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
    return <div className={"px-20 mx-auto"}>{children}</div>;
};

export default Container;
