import { useContextMenu } from "@/hooks/useContextMenu";
import { IContextMenuData } from "@/types/global";
import Icon from "@/ui/Icon/Icon";


type ContextMenuProps = {
    menuData: IContextMenuData[];
}

const ContextMenu: React.FC<ContextMenuProps> = ({ menuData }) => {
    const { isOpen, setIsOpen } = useContextMenu();
    return (
        <>
            {menuData.length != 0 &&
                <div className="context-menu relative">
                    <div onClick={() => setIsOpen(!isOpen)}>
                        <Icon name='more_vert' hovered={true}></Icon>
                    </div>
                    <div className={`
                        absolute top-[calc(100%+8px)] right-0 bg-gray py-2 rounded-xl z-10 shadow-2xl shadow-mainblack
                        transition-all duration-300
                        ${isOpen ? 'opacity-100' : 'opacity-0'}`
                    }>
                        <ul className="flex flex-col gap-2">
                            {menuData.map((item, index) => {
                                return (
                                    <li key={index} className="flex gap-2 px-3 cursor-pointer 
                                        hover:text-blue transition-all duration-300"
                                        onClick={item.action}

                                    >
                                        <Icon {...item.icon}></Icon>
                                        {item.name}

                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            }
        </>
    )
}

export default ContextMenu;