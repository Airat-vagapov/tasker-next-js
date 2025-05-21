'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

const Logo: React.FC = () => {
    const [colorClass, setColorClass] = useState<string>("bg-blue");
    const colorClassRandomizer = () => {
        const colors = [
            "bg-blue",
            "bg-redFull",
            "bg-greenFull",
            "bg-yellowFull",
            "bg-purpleFull",
            "bg-orangeFull",
        ];

        const colorClass = colors[Math.floor(Math.random() * colors.length)];
        setColorClass(colorClass)
    }
    useEffect(() => {
        const classRandomInterval = setInterval(colorClassRandomizer, 2000)

        return () => { clearInterval(classRandomInterval) }
    }, [])

    return (
        <Link href={"/"}>
            <div className={`logo px-4 py-2 font-bold transition-all duration-500
        ${colorClass ? colorClass : "bg-blue"}
            `}>Tasker
            </div>
        </Link>
    )

};

export default Logo;
