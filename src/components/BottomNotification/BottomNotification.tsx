import Button from "@/ui/Button/Button";
import Container from "@/ui/Container/Container";
import Icon from "@/ui/Icon/Icon";
import { useState } from 'react';

type BottomNotificationProps = {
    showStatus: boolean;
    content: {
        title: string
        text: string
    };
    showButton?: boolean;
    handleClose: () => void;
}

const BottomNotification: React.FC<BottomNotificationProps> = ({
    showStatus,
    content,
    showButton = true,
    handleClose
}) => {
    const [showBlock, setShowBlock] = useState<boolean>(true);

    return (
        <div
            className={`fixed w-fit bottom-4 left-[50%] right-0  text-mainblack
                transition-transform duration-500 transform 
                translate-x-[-50%]
                ${(showStatus && showBlock) ? 'translate-y-0' : 'translate-y-[calc(100%+16px)]'
                }`}
        >
            <Container>
                <div className="flex justify-between items-center 
                bg-gray py-4 px-6 rounded-xl text-white
                shadow-[20px] shadow-mainblack
                ">
                    <div className="flex items-center gap-4">
                        <Icon name={'check_circle'} color="mainGreen" size={40}></Icon>
                        <div>
                            <p className='font-bold'>{content.title}</p>
                            <p>{content.text}</p>
                        </div>
                        {showButton &&
                            <Button
                                text="Close"
                                onClick={
                                    () => {
                                        handleClose()
                                        setShowBlock(false);
                                    }
                                }
                            />}
                    </div>



                </div>
            </Container>
        </div>
    )
}

export default BottomNotification;