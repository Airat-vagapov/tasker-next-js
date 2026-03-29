import useNotification from "@/hooks/useNotification"
import BottomNotification from "../BottomNotification/BottomNotification"

const MainNotification = () => {
    const { message, clear } = useNotification()
    if (!message) return null

    return (
        <BottomNotification
            content={{ title: 'Warning', text: message }}
            handleClose={clear}
            showStatus={true}
        />
    )
}

export default MainNotification;