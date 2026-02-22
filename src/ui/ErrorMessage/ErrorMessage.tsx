import Icon from "../Icon/Icon";

type ErrorMessageProps = {
    message?: string;
};

const ErrorMessage = ({ message = "Unknown message" }: ErrorMessageProps) => {
    if (!message || message === 'Unknown message') return null;
    
    const isVisible = Boolean(message?.trim());

    return (
        <div
            className={`overflow-hidden transition-all duration-300 ease-out motion-reduce:transition-none ${isVisible ? "mt-3 max-h-24 translate-y-0 opacity-100" : "mt-0 max-h-0 -translate-y-1 opacity-0"}`}
            aria-hidden={!isVisible}
        >
            <div
                className="flex items-start gap-3 rounded-xl border border-rose-800/80 bg-rose-950/50 px-4 py-3 text-sm leading-5 text-rose-100 shadow-[0_0_0_1px_rgba(244,63,94,0.15)]"
                role={isVisible ? "alert" : undefined}
                aria-live="polite"
            >
                <Icon name={"error"} size={22} color={"rose-400"} />
                <p className="pt-0.5">{message}</p>
            </div>
        </div>
    );
};

export default ErrorMessage;
