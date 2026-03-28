import { link } from "fs";
import Link from 'next/link'

type TextLinkProps = {
    children: React.ReactNode;
    type: "action" | "link";
    link?: string;
    action?: () => void;
};

const TextLink: React.FC<TextLinkProps> = ({ children, type, action, link }) => {
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

            {type && link && type == "link" && (
                <Link
                    href={link}
                    className="text-xs text-gray hover:text-blueHover transition-all duration-300"
                >
                    {children}
                </Link>

            )}
        </>
    );
};

export default TextLink;
