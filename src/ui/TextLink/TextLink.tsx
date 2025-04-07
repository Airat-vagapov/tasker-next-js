type TextLinkProps = {
    children: React.ReactNode;
    type: "action" | "link";
    action?: () => void;
};

const TextLink: React.FC<TextLinkProps> = ({ children, type, action }) => {
    return (
        <>
            {type && type == "action" && (
                <p
                    className="text-xs text-gray hover:text-blueHover transition-all duration-300 cursor-pointer"
                    onClick={action}
                >
                    {children}
                </p>
            )}

            {type && type == "link" && (
                <a
                    href=""
                    className="text-xs text-gray hover:text-blueHover transition-all duration-300"
                >
                    {children}
                </a>
            )}
        </>
    );
};

export default TextLink;
