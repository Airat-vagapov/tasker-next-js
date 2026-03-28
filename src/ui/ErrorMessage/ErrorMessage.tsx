import Icon from "../Icon/Icon";

type ErrorMessageProps = {
    message?: string;
};

const ErrorMessage = ({ message = "Unknown message" }: ErrorMessageProps) => {
    if (!message || message === 'Unknown message') return null;
    
    return (
        <div className="transition-opacity duration-500 ease-out">
            <div className="flex gap-4 items-center rounded-xl p-4 border border-rose-900/50 bg-rose-950/30 text-rose-100 backdrop-blur-sm">
                <div className="shrink-0">
                   <Icon name={'error'} size={32} color={'#fb7185'} />
                </div>
                <p className="text-sm font-medium leading-relaxed">
                    {message}
                </p>
            </div>
        </div>
    )
};

export default ErrorMessage;
