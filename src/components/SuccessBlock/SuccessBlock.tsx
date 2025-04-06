import Icon from "@/ui/Icon/Icon";

const SuccessBlock = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <Icon name={"check_circle"} size={40} />
            <p>Success</p>
        </div>
    );
};

export default SuccessBlock;
