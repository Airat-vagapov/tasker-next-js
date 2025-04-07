import Icon from "@/ui/Icon/Icon";
import TextLink from "@/ui/TextLink/TextLink";
import Title from "@/ui/Title/Title";

type SuccessBlockProps = {
    title: string;
    text: string;
    actionText?: string;
    action?: () => void;
};

const SuccessBlock: React.FC<SuccessBlockProps> = ({
    title,
    text,
    actionText,
    action,
}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <Icon name={"check_circle"} size={48} color={"mainGreen"} />
            <div className="flex flex-col items-center justify-center gap-2">
                <Title>{title}</Title>
                <p className="text-base">{text}</p>
                <TextLink type="action" action={action}>
                    {actionText}
                </TextLink>
            </div>
        </div>
    );
};

export default SuccessBlock;
