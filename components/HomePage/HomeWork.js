import Link from "next/link"
import {useState} from "react";

function HomeWork({setProjectsRef, title, key, img, link}) {
    const [hovered, setHovered] = useState(false)

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <li key={key} ref={setProjectsRef} className='p-0 opacity-0 m-0 w-full h-full text-primary flex justify-center
            items-center text-center text-xl absolute top-0 left-0 rounded-md'>
            <Link href={link}>
                <span className="absolute opacity-0 top-3 font-medium text-amber-50">{title}</span>
                {hovered === true ? <>
                    <h1 className="text-white fixed bottom-2 text-xs mb-2">
                        {title}
                    </h1>
                </> : null}
                <img onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}
                     src={img} alt={title} className='h-full object-contain'/>
            </Link>
        </li>
    )
}

export default HomeWork