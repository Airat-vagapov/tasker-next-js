import React from "react";

type BadgeProps = {
    children: React.ReactNode;
    color?: string
}

const Badge: React.FC<BadgeProps> = ({ children, color }) => {
    console.log(color)
    return (
        <>
            <div className={`relative py-1 px-2 pl-5  text-mainblack rounded-3xl w-fit
                after:content-[''] after:absolute after:block after:top-1/2 after:-translate-y-1/2 after:left-2 
                after:w-2 after:h-2  after:rounded-full after:z-10
                ${color ? color : 'bg-purple after:bg-purpleFull'}
            `}>
                <p>{children}</p>
            </div>
        </>
    )
}

export default Badge