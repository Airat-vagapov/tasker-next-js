import Button from "@/ui/Button/Button";
import Container from "@/ui/Container/Container";
import Icon from "@/ui/Icon/Icon";
import { useEffect, useState } from 'react';

type BottomNotificationProps = {
    showStatus?: boolean;
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

    // Открытие по 
    useEffect(() => {
        if (showStatus) {
            setShowBlock(showStatus)
        }
    }, [showStatus])

    useEffect(() => {
        let closeTimeout: NodeJS.Timeout
        if (showBlock && showStatus) {
            closeTimeout = setTimeout(() => {
                setShowBlock(false);
                handleClose();
            }, 2000)
        }

        return () => {
            clearTimeout(closeTimeout)
        }
    }, [showBlock, showStatus])

    return (
        <div
            className={`fixed w-fit bottom-4 left-[50%] right-0  text-mainblack
                transition-transform duration-500 transform 
                translate-x-[-50%] w-full
                ${(showStatus && showBlock) ? 'translate-y-0' : 'translate-y-[calc(100%+16px)]'
                }`}
        >
            <Container>
                <div className="flex justify-between items-center 
                bg-gray py-4 px-6 rounded-xl text-black
                shadow-[20px] shadow-mainblack bg-white
                z-50
                ">
                    <div className="flex items-center gap-4 w-full">
                        <Icon name={'check_circle'} color="mainGreen" size={40}></Icon>
                        <div>
                            <p className='font-bold'>{content.title}</p>
                            <p>{content.text}</p>
                        </div>
                        {showButton &&
                            <div className="ml-auto">
                                <Button
                                    text="Close"
                                    onClick={
                                        () => {
                                            handleClose()
                                            setShowBlock(false);
                                        }
                                    }
                                />
                            </div>
                        }
                    </div>



                </div>
            </Container>
        </div>
    )
}

export default BottomNotification;