import Icon from "@/ui/Icon/Icon"
import TextLink from "@/ui/TextLink/TextLink"
import Title from "@/ui/Title/Title"

type ErrorBlockProps = {
    title: string;
    text: React.ReactNode | string;
    actionText?: string;
    action?: () => void;

    textPosition?: string;

    blockColor?: string;
};

const ErrorBlock: React.FC<ErrorBlockProps> = ({
    title,
    text,
    action,
    actionText,
    textPosition,
    blockColor
}) => {
    return (
        <div className={`flex flex-col items-center justify-center gap-4 rounded-xl p-8
            ${blockColor == 'white' ? 'bg-white' : ''}
        `}>
            <Icon name={"error"} size={48} color={"errorRed"} />
            <div className="flex flex-col items-center justify-center gap-2 w-full">
                <Title>{title}</Title>
                <div className={`
                    text-base w-full
                    ${blockColor == 'white' ? 'text-black' : ''}
                    ${textPosition == 'center' ? 'text-center' : 'text-left'}    
                `}>{text}</div>
                {actionText &&
                    <TextLink type="action" action={action}>
                        {actionText}
                    </TextLink>}

            </div>
        </div>
    )
}

export default ErrorBlock;