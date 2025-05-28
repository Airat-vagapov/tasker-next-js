import { useContextMenu } from "@/hooks/useContextMenu";
import Icon from "@/ui/Icon/Icon";


const ContextMenu = () => {
    const { isOpen, setIsOpen } = useContextMenu();

    return (
        <div className="context-menu relative">
            <div onClick={() => setIsOpen(!isOpen)}>
                <Icon name='more_vert' hovered={true}></Icon>
            </div>
            <div className={`
                absolute top-[100%] right-0 bg-gray py-2 rounded-xl z-10 shadow-2xl shadow-mainblack
                transition-all duration-300
                ${isOpen ? 'opacity-100' : 'opacity-0'}`
            }>
                <ul className="flex flex-col gap-2">
                    <li className="px-3 cursor-pointer hover:text-blue transition-all duration-300">111</li>
                    <li className="px-3">222</li>
                </ul>
            </div>
        </div>

    )
}

export default ContextMenu;